import {
    ViewerApp,
    AssetManagerPlugin,
    GBufferPlugin,
    timeout,
    ProgressivePlugin,
    TonemapPlugin,
    SSRPlugin,
    SSAOPlugin,
    DiamondPlugin,
    FrameFadePlugin,
    GLTFAnimationPlugin,
    GroundPlugin,
    BloomPlugin,
    TemporalAAPlugin,
    AnisotropyPlugin,
    GammaCorrectionPlugin,
    CanvasTexture,
    addBasePlugins,
    Vector3, 
    DoubleSide, 
    AssetManagerBasicPopupPlugin,

    IViewerPlugin,
    // Color, // Import THREE.js internals
    // Texture, // Import THREE.js internals
} from "webgi";

import gsap from 'gsap';
import  * as THREE  from 'three';

import "./styles.css";

async function setupViewer(){

    // Initialize the viewer
    const viewer = new ViewerApp({
        canvas: document.getElementById('webgi-canvas') as HTMLCanvasElement,
    })

    // Add some plugins
    const manager = await viewer.addPlugin(AssetManagerPlugin)
    const camera = viewer.scene.activeCamera;
    const position = camera.position;
    const target = camera.target;
    // Add a popup(in HTML) with download progress when any asset is downloading.
    await viewer.addPlugin(AssetManagerBasicPopupPlugin)


    // or use this to add all main ones at once.
    await addBasePlugins(viewer)

    // Add more plugins not available in base, like CanvasSnipperPlugin which has helpers to download an image of the canvas.
    //await viewer.addPlugin(CanvasSnipperPlugin)

    // This must be called once after all plugins are added.
    viewer.renderer.refreshPipeline()
    const gltfAnims = viewer.getPlugin(GLTFAnimationPlugin);

// Play all animations

    await manager.addFromPath("./assets/house.glb")

    await timeout(1000) // wait 1 sec
    
    const tl = gsap.timeline();

    const contentBox = document.querySelector('.target-content');

    let needsUpdate = true;

    const annotations = [
        {
            ptx:-0.6365125773, 
            pty:-0.6722497739,
            ptz:-0.4513748276,
            cpx: -2.1281674947,
            cpy: -0.0038074679,
            cpz: -4.0527456924,
            ctx: -0.8693364285,
            cty: -0.1891587973,
            ctz: -0.520853438,
            num: 1,
            content: '<h2>Garage</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse viverra, magna at euismod scelerisque, nunc odio condimentum enim, non posuere eros risus quis dolor. Ut convallis velit in ullamcorper scelerisque. Donec vitae odio lacinia, iaculis dui at, rhoncus purus. Phasellus suscipit finibus mauris sed imperdiet. Vivamus faucibus, massa nec rutrum maximus, libero quam vulputate augue, vel scelerisque arcu ante at risus. Donec pulvinar facilisis ipsum, eget suscipit sem sagittis sit amet. Phasellus molestie lorem eu velit dictum blandit. Vivamus faucibus urna nec libero ultrices, eget commodo purus luctus.</p>'
        },
        {
            ptx:-0.1082163274,
            pty: 1.2124056976,
            ptz: 1.0748475763,
            cpx: -2.9927716696,
            cpy: 2.6575226812,
            cpz: 2.2383183131,
            ctx:  0.8257874144,
            cty: 0.3403910588,
            ctz: 0.3753282561,
            num: 2,
            content: '<h2>Lorem Ipsum 1</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse viverra, magna at euismod scelerisque, nunc odio condimentum enim, non posuere eros risus quis dolor. Ut convallis velit in ullamcorper scelerisque. Donec vitae odio lacinia, iaculis dui at, rhoncus purus. Phasellus suscipit finibus mauris sed imperdiet. Vivamus faucibus, massa nec rutrum maximus, libero quam vulputate augue, vel scelerisque arcu ante at risus. Donec pulvinar facilisis ipsum, eget suscipit sem sagittis sit amet. Phasellus molestie lorem eu velit dictum blandit. Vivamus faucibus urna nec libero ultrices, eget commodo purus luctus.</p>'
        },
        {
            ptx: 1.1172132224,
            pty: -0.6924056976,
            ptz: -0.0148325413,
            cpx: 3.1170873937,
            cpy: 1.5660634159,
            cpz: -3.3174414567,
            ctx: -0.1284021759,
            cty: -0.4733206224,
            ctz: 0.4826160275,
            num: 3,
            content: '<h2>Ground Floor Rooms</h2><p>Integer feugiat est molestie, sollicitudin justo quis, tincidunt neque. In non dui ac nulla malesuada scelerisque. Etiam quam lorem, pharetra ut tortor vitae, cursus egestas orci. Fusce et tellus ac quam dictum rhoncus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque dapibus, justo sit amet dictum malesuada, quam tellus interdum ante, non pretium orci neque mattis neque. Morbi quis est et tortor malesuada euismod et sed lacus. Duis ac nibh faucibus, ultricies massa et, commodo tortor. Etiam a vehicula est, nec ultrices urna. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed auctor, nisl et sagittis vehicula, lectus augue dictum eros, id rhoncus purus est vitae nisi. Sed tellus justo, condimentum vitae pulvinar quis, pretium egestas enim.</p>'
        },
        {
            ptx: 1.0472162370,
            pty: 1.1024026976,
            ptz: 0.220415763,
            cpx: 3.838886275,
            cpy: 2.7316710022,
            cpz: -1.4996530424,
            ctx: -0.4641666951,
            cty: 0.3047461317,
            ctz: 0.4653918344,
            num: 4,
            content: '<h2>Second Floor Rooms</h2><p>Nulla in lobortis urna. Phasellus rhoncus sapien nisl, vel pellentesque eros pharetra eu. Mauris pellentesque viverra mi eget blandit. Etiam a varius massa. Cras bibendum porttitor ligula, id tristique metus fermentum et. Nunc tincidunt metus non rhoncus ultrices. Morbi semper dui eu velit gravida efficitur. Suspendisse potenti. Nullam consequat hendrerit lectus et pharetra. Integer in urna ac leo imperdiet eleifend.</p>'
        },
        {
            ptx: -1.1272162274,
            pty: 1.0424056976,
            ptz: -1.0045425763,
            cpx: -2.1404854963,
            cpy: 1.9763889637,
            cpz: -3.6915633787,
            ctx: -0.4641666951,
            cty: 0.3047461317,
            ctz: 0.4653918344,
            num: 5,
            content: '<h2>Terrace</h2><p>Praesent eget velit nec ex sagittis consequat. Nunc vehicula mauris quis ultrices egestas. Phasellus sapien nibh, posuere in ultricies vitae, sodales in erat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus finibus rhoncus nisi quis dictum. Praesent ullamcorper pulvinar pharetra. Nulla volutpat mi quis convallis ultricies. Morbi molestie in nulla a convallis.</p>'
        }
    ]

    viewer.scene.setDirty();

    function updateScreenPosition() {
        let c = 1;
        annotations.forEach((item) => {
            loadAnnotationObject(document.querySelector('.annotation-'+c.toString()), new Vector3(item.ptx, item.pty, item.ptz));
            c++;
        })
    } 

    function loadAnnotationObject(annotation: HTMLDivElement, vector: Vector3) {
        const canvas = viewer.canvas;

        vector.project(camera.cameraObject);
    
        vector.x = Math.round(
          (0.5 + vector.x / 2) * (canvas.width / viewer.renderer.displayCanvasScaling)
        );
        vector.y = Math.round(
          (0.5 - vector.y / 2) * (canvas.height / viewer.renderer.displayCanvasScaling)
        );
    
        annotation.style.top = `${vector.y}px`;
        annotation.style.left = `${vector.x}px`;
    }

    function createAnnotations() {
        let c = 1;
        const tl = gsap.timeline();

        annotations.forEach((item) => {
            let elm = document.createElement('div');
            elm.className = 'annotation annotation-' + c;
            elm.innerHTML = c.toString();

            document.body.appendChild(elm);

            elm.addEventListener('click', () => {
                viewer.scene.activeCamera.setCameraOptions({controlsEnabled: false})

                contentBox.querySelectorAll('.content')[0].innerHTML = item.content;

                tl.to(position, {x: item.cpx, y: item.cpy , z: item.cpz, duration: 1, onUpdate})
                tl.to(target, {x: item.ctx, y: item.cty , z: item.ctz, duration: 1, onUpdate})

                setTimeout(function () {
                    contentBox.style.display = 'block';
                }, 1500);
            });

            c++;
        })
    }

    createAnnotations();

    let expanded = false;
    
    viewer.addEventListener("postRender", () => {
        if(expanded)
            updateScreenPosition();
        //updateAnnotationOpacity();
    });
    const explore = document.querySelector('.explore');

    explore?.addEventListener('click', (e) => {
        explore.style.display = 'none';

        tl.to(position, {x: -6.3269533864, y: 4.0538719781 , z: -7.0667129458, duration: 1, onUpdate})
        tl.to(target, {x: 0.4695225008, y: 0.4086792986, z: 0.0404471063, duration: 0.5, onUpdate})
        expandHouse();
    })

    async function expandHouse() {
        gltfAnims.animationSpeed = 2;
        gltfAnims.loopAnimations = false;

        await timeout(2500)
        await gltfAnims.playAnimation();
        expanded = true;
        //updateScreenPosition();
    }

    document.querySelector('.close').addEventListener('click', () => {
        contentBox.style.display = 'none';

        tl.to(position, {x: -6.3269533864, y: 4.0538719781 , z: -7.0667129458, duration: 1, onUpdate})
        tl.to(target, {x: 0.4695225008, y: 0.4086792986, z: 0.0404471063, duration: 0.5, onUpdate})
        
        viewer.scene.activeCamera.setCameraOptions({controlsEnabled: true})
    })

    function onUpdate() {
        needsUpdate = true;
        //viewer.renderer.resetShadows();
        viewer.setDirty()
    }

    viewer.addEventListener('preFrame', () => {
        if(needsUpdate) {
            camera.positionUpdated(true);
            camera.targetUpdated(true);
            needsUpdate = false;    
        }
    })


}

setupViewer()
