function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

const CoverSamples = importAll(require.context('/', false, /\.(png|jpe?g|svg)$/))
export const getRandomCover = () => {
    const keys = Object.keys(CoverSamples)
    return CoverSamples[keys[getRandomInt(0, keys.length)]]
}

export default CoverSamples