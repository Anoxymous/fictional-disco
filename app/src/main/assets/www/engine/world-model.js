// --- Vector helpers ---
function vec3(x = 0, y = 0, z = 0) {
    return { x, y, z };
}

function addVec(a, b) {
    return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
}

function scaleVec(v, s) {
    return { x: v.x * s, y: v.y * s, z: v.z * s };
}

// Rotate vector v by quaternion q (q * v * q^-1)
function rotateVecByQuat(v, q) {
    const qv = { x: v.x, y: v.y, z: v.z, w: 0 };
    const qi = { x: -q.x, y: -q.y, z: -q.z, w: q.w }; // inverse for unit q
    const r = quatMul(quatMul(q, qv), qi);
    return { x: r.x, y: r.y, z: r.z };
}

// --- Quaternion helpers ---
function quat(x = 0, y = 0, z = 0, w = 1) {
    return { x, y, z, w };
}

function quatMul(a, b) {
    return {
        w: a.w*b.w - a.x*b.x - a.y*b.y - a.z*b.z,
        x: a.w*b.x + a.x*b.w + a.y*b.z - a.z*b.y,
        y: a.w*b.y - a.x*b.z + a.y*b.w + a.z*b.x,
        z: a.w*b.z + a.x*b.y - a.y*b.x + a.z*b.w
    };
}

function normalizeQuat(q) {
    const len = Math.hypot(q.x, q.y, q.z, q.w) || 1;
    return { x: q.x/len, y: q.y/len, z: q.z/len, w: q.w/len };
}


class SpaceObject {
    constructor({
        id,
        position = vec3(),
        velocity = vec3(),
        orientation = quat(),
        angularVelocity = vec3(),
        mass = 1,
        momentOfInertia = 1, // uniform scalar
        size = { w: 1, h: 1, l: 1 }
    }) {
        this.id = id;

        this.position = position;
        this.velocity = velocity;

        this.orientation = normalizeQuat(orientation);
        this.angularVelocity = angularVelocity;

        this.mass = mass;
        this.momentOfInertia = momentOfInertia;
        this.size = size;

        // accumulated forces/torques in WORLD space (after conversion)
        this.force = vec3();
        this.torque = vec3();
    }

    // Apply a force in LOCAL space at a LOCAL offset from center of mass
    applyLocalForce(localForce, localOffset = vec3()) {
        // Convert to world space
        const worldForce = rotateVecByQuat(localForce, this.orientation);
        const worldOffset = rotateVecByQuat(localOffset, this.orientation);

        // Accumulate linear force
        this.force = addVec(this.force, worldForce);

        // Torque = r x F
        const torque = {
            x: worldOffset.y * worldForce.z - worldOffset.z * worldForce.y,
            y: worldOffset.z * worldForce.x - worldOffset.x * worldForce.z,
            z: worldOffset.x * worldForce.y - worldOffset.y * worldForce.x
        };
        this.torque = addVec(this.torque, torque);
    }

    // Apply a pure torque in LOCAL space
    applyLocalTorque(localTorque) {
        const worldTorque = rotateVecByQuat(localTorque, this.orientation);
        this.torque = addVec(this.torque, worldTorque);
    }

    update(dt) {
        if (dt <= 0) return;

        // --- Linear dynamics ---
        const accel = scaleVec(this.force, 1 / this.mass);
        this.velocity = addVec(this.velocity, scaleVec(accel, dt));
        this.position = addVec(this.position, scaleVec(this.velocity, dt));

        // --- Angular dynamics (uniform inertia) ---
        const alpha = scaleVec(this.torque, 1 / this.momentOfInertia);
        this.angularVelocity = addVec(this.angularVelocity, scaleVec(alpha, dt));

        // Integrate quaternion: q' = 0.5 * q * (0, ω)
        const omegaQuat = { x: this.angularVelocity.x, y: this.angularVelocity.y, z: this.angularVelocity.z, w: 0 };
        const dq = quatMul(this.orientation, omegaQuat);
        this.orientation = {
            x: this.orientation.x + 0.5 * dq.x * dt,
            y: this.orientation.y + 0.5 * dq.y * dt,
            z: this.orientation.z + 0.5 * dq.z * dt,
            w: this.orientation.w + 0.5 * dq.w * dt
        };
        this.orientation = normalizeQuat(this.orientation);

        // Clear forces/torques for next frame (ideal, instantaneous thrusters)
        this.force = vec3();
        this.torque = vec3();
    }
}

class WorldModel {
    constructor() {
        this.objects = new Map();
    }

    addObject(obj) {
        if (!obj.id) throw new Error("Object must have an id");
        this.objects.set(obj.id, obj);
    }

    removeObject(id) {
        this.objects.delete(id);
    }

    getObject(id) {
        return this.objects.get(id);
    }

    update(dt) {
        for (const obj of this.objects.values()) {
            obj.update(dt);
        }
    }

    getAllObjects() {
        return Array.from(this.objects.values());
    }
}

