import {
    ViewerApp,
    AssetManagerPlugin,
    GBufferPlugin,
    TonemapPlugin,
    SSRPlugin,
    SSAOPlugin,
    BloomPlugin,
    GammaCorrectionPlugin,

    addBasePlugins,
    ITexture, TweakpaneUiPlugin, AssetManagerBasicPopupPlugin, CanvasSnipperPlugin,

    IViewerPlugin,

    // Color, // Import THREE.js internals
    // Texture, // Import THREE.js internals
} from "webgi";
import "./styles.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

async function setupViewer(){

    // Initialize the viewer
    const viewer = new ViewerApp({
        canvas: document.getElementById('webgi-canvas') as HTMLCanvasElement,
        useRgbm : false
    })

    // Add some plugins
    const manager = await viewer.addPlugin(AssetManagerPlugin)
    const camera = viewer.scene.activeCamera
    const position = camera.position
    const target = camera.target
    let height = window.innerHeight
    let width = window.innerWidth
    

    // Add a popup(in HTML) with download progress when any asset is downloading.
    await viewer.addPlugin(AssetManagerBasicPopupPlugin)

    // Add plugins individually.
     //await viewer.addPlugin(GBufferPlugin)
    // await viewer.addPlugin(new ProgressivePlugin(32))
    // await viewer.addPlugin(new TonemapPlugin(!viewer.useRgbm))
    // await viewer.addPlugin(GammaCorrectionPlugin)
     //await viewer.addPlugin(SSRPlugin)
    // await viewer.addPlugin(SSAOPlugin)
    //await viewer.addPlugin(DiamondPlugin)
    // await viewer.addPlugin(FrameFadePlugin)
    // await viewer.addPlugin(GLTFAnimationPlugin)
    // await viewer.addPlugin(GroundPlugin)
     //await viewer.addPlugin(BloomPlugin)
    // await viewer.addPlugin(TemporalAAPlugin)
    // await viewer.addPlugin(AnisotropyPlugin)

    // or use this to add all main ones at once.
    await addBasePlugins(viewer)

    // Add more plugins not available in base, like CanvasSnipperPlugin which has helpers to download an image of the canvas.
    await viewer.addPlugin(CanvasSnipperPlugin)

    // This must be called once after all plugins are added.

    viewer.renderer.refreshPipeline()

    await manager.addFromPath("./assets/television.glb")

    // Load an environment map if not set in the glb file
    // await viewer.scene.setEnvironment(
    //     await manager.importer!.importSinglePath<ITexture>(
    //         "./assets/environment.hdr"
    //     )
    // );

    // Add some UI for tweak and testing.


    function setupScrollAnimation(){
        const tl = gsap.timeline()

        tl
        .to(position, {
            x : 8.6,
            y : -0.01,
            z : -1.64,
            scrollTrigger : {
                trigger : '.tab--2',
                start :  "top bottom",
                end : "top top",
                scrub : true
            }, onUpdate
        })
        .to(".first", {
            xPercent : '150',
            opacity : 0,
            scrollTrigger : {
                trigger : '.tab--2',
                start :  "top bottom",
                end : "top top",
                scrub : true
            }
        })
        .from(".second",{
            opacity : 0,
            x : -300,
            scrollTrigger : {
                trigger : '.tab--2',
                start :  "top bottom",
                end : "top top",
                scrub : true
            }
        })
        .to(target,{
            x : 0.99,
            y : -0.029,
            z : 1.66,
            scrollTrigger : {
                trigger : ".tab--2",
                start : 'top bottom',
                end : 'top top',
                scrub: true
            }
        });

        gsap.to(".arrow--down", {
            duration : 1.2,
            y : 20,
            repeat : -1,
            scrollTrigger : {
                trigger : ".tab--2",
                start :  "top 50%",
                end : "top top",
            },
        });

        gsap.from(".third", {
            opacity : 0,
            xPercent : "-150",
            scrollTrigger : {
                trigger : ".tab--3",
                start : 'top bottom',
                end : 'top top',
                scrub : true
            }
        })


    }

    setupScrollAnimation()

    let needsUpdate = true

    function onUpdate() {
        needsUpdate = true
        viewer.renderer.resetShadows()
        viewer.setDirty()
    }
    viewer.addEventListener('preFrame', () => {
        if (needsUpdate) {
            camera.positionUpdated(false)
            camera.targetUpdated(true)
            needsUpdate = false
        }
    })


    

}

setupViewer()
