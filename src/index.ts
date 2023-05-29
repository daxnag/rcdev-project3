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
    let needsUpdate = true;

    //const annotation = document.querySelector(".annotation");

    
    // const spriteMaterial = viewer.createMaterial('basic',{
    //     map: numberTexture,
    //     alphaTest: 0.5,
    //     transparent: true,
    //     depthTest: false,
    //     depthWrite: false,
    //     side: DoubleSide,
    // });

    //const annotationPosition = new Vector3(5,1,0);
    
    viewer.scene.setDirty();

    function updateScreenPosition() {
    
        const vector1 = new Vector3(-0.6365125773, -0.6722497739, -0.4513748276);
        const vector2 = new Vector3(-0.1082163274, 1.2124056976, 1.0748475763);
        const vector3 = new Vector3(1.1172132224, -0.6924056976, -0.0148325413);
        const vector4 = new Vector3(1.0472162370, 1.1024026976, 1.0048415763);
        const vector5 = new Vector3(-0.1272162274, 2.2424056976, -0.6245475763);
        
        const annotation1 = document.querySelector('.annotation-1');
        const annotation2 = document.querySelector('.annotation-2');   
        const annotation3 = document.querySelector('.annotation-3');   
        const annotation4 = document.querySelector('.annotation-4');   
        const annotation5 = document.querySelector('.annotation-5');   

        loadAnnotationObject(annotation1, vector1)
        loadAnnotationObject(annotation2, vector2)
        loadAnnotationObject(annotation3, vector3)
        loadAnnotationObject(annotation4, vector4)
        loadAnnotationObject(annotation5, vector5)
    } 

    function loadAnnotationObject(annotation, vector) {
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

    let expanded = false;

    
    viewer.addEventListener("postRender", () => {
        if(expanded)
            updateScreenPosition();
        //updateAnnotationOpacity();
    });

    document.querySelector('.explore')?.addEventListener('click', () => {
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

    // Load an environment map if not set in the glb file
    // await viewer.scene.setEnvironment(
    //     await manager.importer!.importSinglePath<ITexture>(
    //         "./assets/environment.hdr"
    //     )
    // );

    // Add some UI for tweak and testing.
    //const uiPlugin = await viewer.addPlugin(TweakpaneUiPlugin)
    // Add plugins to the UI to see their settings.
    //uiPlugin.setupPlugins<IViewerPlugin>(TonemapPlugin, CanvasSnipperPlugin)

}

setupViewer()
