function importAll(r: __WebpackModuleApi.RequireContext) {
    let images = {};
    r.keys().map(item => { // @ts-ignore
        images[item.replace('./', '')] = r(item); });
    return images as Object;
}

const wallpapers = importAll(require.context('/', false, /\.(png|jpe?g|gif)$/))

export default wallpapers