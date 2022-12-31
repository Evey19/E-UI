// 获取深层次对象的值
export const getValueByPath = function (object, prop) {
    prop = prop || ''
    const paths = prop.split('.')
    let current = object
    let result = null
    for (let i = 0, j = paths.length; i < j; i++) {
        const path = paths[i]
        if (!current) break
        if (i === j - 1) {
            result = current[path]
            break
        }
        current = current[path]
    }
    return result
}

export function getPropByPath(obj, path, strict) {
    let tempObj = obj;
    path = path.replace(/\[(\w+)\]/g, '.$1');
    path = path.replace(/^\./, '');

    let keyArr = path.split('.');
    let i = 0;
    for (let len = keyArr.length; i < len - 1; ++i) {
        if (!tempObj && !strict) break;
        let key = keyArr[i];
        if (key in tempObj) {
            tempObj = tempObj[key];
        } else {
            if (strict) {
                throw new Error('please transfer a valid prop path to form item!');
            }
            break;
        }
    }
    return {
        o: tempObj,
        k: keyArr[i],
        v: tempObj ? tempObj[keyArr[i]] : null
    };
};

export function rafThrottle(fn) {
    let locked = false
    return function (...args) {
        if (locked) return
        locked = true
        window.requestAnimationFrame(_ => {
            fn.apply(this, args)
            locked = false
        })
    }
}