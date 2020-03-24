module.exports = {
    plugins: {
        autoprefixer: {},
        // pc端把这个注掉，执行npm uninstall postcss-px-to-viewport
        "postcss-px-to-viewport": {
            unitToConvert: "px",
            viewportWidth: 375,
            unitPrecision: 5,
            propList: ["*"],
            viewportUnit: "vw",
            fontViewportUnit: "vw",
            selectorBlackList: [],
            minPixelValue: 1,
            mediaQuery: false, // 媒体查询
            replace: true,
            exclude: [],
            landscape: false,
            landscapeUnit: "vw",
            landscapeWidth: 568
        }
    }
};