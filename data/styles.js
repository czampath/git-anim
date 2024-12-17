/**
 * Inverted: Normally the animation is only applied to active slots (when commits > 0)
 *           But if a style is `Inverted` the animation is only applied to empty slots
 * 
 * styles: To Be used, if a style needs additional css styles
 */
const STYLES = [
    {
        name: "Hue Ripple",
        id: "hue-ripple",
        isInverted: false,
        styles: "",
        keyframes: `@keyframes pop {
            0% { opacity: .8; filter: hue-rotate(0deg); }
            50% { opacity: 1; filter: hue-rotate(180deg); }
            100% { opacity: .8; filter: hue-rotate(360deg); }
        }`
    },
    {
        name: "Blur Grey Ripple",
        id: "blur-grey-ripple",
        isInverted: false,
        styles: "",
        keyframes: `@keyframes pop {
            0% { opacity: .8; filter: blur(0px) saturate(1) drop-shadow(0px 0px 0px black); }
            50% { opacity: 1; filter: blur(0px) saturate(0) drop-shadow(1px 2px 2px black); }
            100% { opacity: .8; filter: blur(0px) saturate(1) drop-shadow(0px 0px 0px black); }
        }`
    },
    {
        name: "Blur Ripple",
        id: "blur-ripple",
        isInverted: false,
        styles: "",
        keyframes: `@keyframes pop {
            0% { opacity: .8; filter: blur(0px)   }
            50% { opacity: 1; filter: blur(3px)   }
            100% { opacity: .8; filter: blur(0px)   }
        }`
    },
    {
        name: "Scale Ripple",
        id: "scale-ripple",
        isInverted: false,
        styles: "",
        keyframes: `@keyframes pop {
            0% { opacity: .8; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.3); }
            100% { opacity: .8; transform: scale(1); }
        }`
    },
    {
        name: "Rotate",
        id: "rotate",
        isInverted: false,
        styles: "",
        keyframes: `@keyframes pop {
            0% { opacity: .8; transform: rotate(0deg); }
            50% { opacity: 1; transform: rotate(360deg); }
            100% { opacity: 1; transform: rotate(360deg); }
        }`
    },
    {
        name: "Fall",
        id: "fall",
        isInverted: false,
        styles: "",
        keyframes: `@keyframes pop {
            10% { filter: drop-shadow(0px 0px 0px black); }
            20% { opacity: 1; transform: translateY(0px) rotate(0deg); filter: drop-shadow(1px 1px 10px black); }
            30% { opacity: 1; transform: translateY(200px) rotate(120deg); filter: drop-shadow(1px 1px 10px black);}
            31% { opacity: 0; transform: translateY(200px) rotate(120deg);; filter: drop-shadow(1px 1px 10px black);}
            50% { opacity: 0; transform: translateY(-200px) rotate(0deg); filter: drop-shadow(0px 0px 0px black);}
            90% { opacity: 0; transform: translateY(-200px) rotate(0deg); filter: drop-shadow(0px 0px 0px black); }
        }`
    },
    {
        name: "Fall Invert",
        id: "fall-invert",
        isInverted: true,
        styles: "",
        keyframes: `@keyframes pop {
            10% { filter: drop-shadow(0px 0px 0px black); }
            20% { opacity: 1; transform: translateY(0px) rotate(0deg); filter: drop-shadow(1px 1px 10px black); }
            30% { opacity: 1; transform: translateY(200px) rotate(120deg); filter: drop-shadow(1px 1px 10px black);}
            31% { opacity: 0; transform: translateY(200px) rotate(120deg);; filter: drop-shadow(1px 1px 10px black);}
            50% { opacity: 0; transform: translateY(-200px) rotate(0deg); filter: drop-shadow(0px 0px 0px black);}
            90% { opacity: 0; transform: translateY(-200px) rotate(0deg); filter: drop-shadow(0px 0px 0px black); }
        }`
    },
];

module.exports = STYLES;