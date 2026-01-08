import * as THREE from 'three';

// Only init if canvas container is present, but since we are replacing the old HTML structure with a new one
// we might not have a dedicated #canvas-container. 
// However, I'll create a canvas and append it to the hero section dynamically to ensure it exists.

const initThree = () => {
    const hero = document.getElementById('hero');
    if (!hero) return;

    const container = document.createElement('div');
    container.id = 'canvas-container';
    container.className = 'absolute inset-0 z-0 pointer-events-none opacity-60 mix-blend-screen'; // subtle overlay
    hero.insertBefore(container, hero.firstChild);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Shapes
    const geometry1 = new THREE.IcosahedronGeometry(1, 0);
    const geometry2 = new THREE.OctahedronGeometry(0.8, 0);
    const geometry3 = new THREE.TorusKnotGeometry(0.5, 0.2, 100, 16);

    const material = new THREE.MeshBasicMaterial({
        color: 0x6366f1,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });

    const shapes = [];

    for (let i = 0; i < 15; i++) {
        let geometry;
        const random = Math.random();
        if (random < 0.33) geometry = geometry1.clone();
        else if (random < 0.66) geometry = geometry2.clone();
        else geometry = geometry3.clone();

        const mesh = new THREE.Mesh(geometry, material.clone());
        mesh.position.set(
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 10 - 5
        );
        mesh.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );
        mesh.scale.setScalar(Math.random() * 0.5 + 0.5);

        // Random float parameters
        mesh.userData = {
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.01,
                y: (Math.random() - 0.5) * 0.01,
                z: (Math.random() - 0.5) * 0.01
            },
            floatSpeed: Math.random() * 0.002 + 0.001,
            floatOffset: Math.random() * Math.PI * 2,
            initialY: mesh.position.y
        };

        scene.add(mesh);
        shapes.push(mesh);
    }

    camera.position.z = 5;

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    document.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
        requestAnimationFrame(animate);

        shapes.forEach((shape) => {
            shape.rotation.x += shape.userData.rotationSpeed.x;
            shape.rotation.y += shape.userData.rotationSpeed.y;
            shape.rotation.z += shape.userData.rotationSpeed.z;

            // Float up and down
            shape.position.y = shape.userData.initialY + Math.sin(Date.now() * shape.userData.floatSpeed + shape.userData.floatOffset) * 0.5;
        });

        // Parallax
        camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
        camera.position.y += (-mouseY * 0.5 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    };

    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
};

initThree();
