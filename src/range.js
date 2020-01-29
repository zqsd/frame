export function* irange(start, end = null, step = 1) {
    if(arguments.length === 2) {
        step = end || 1;
        end = start;
        start = 0;
    }
    if(start > end) {
        step = -step;
    }
    if(step > 0) {
        for(let i = start; i <= end; i += step) {
            yield i;
        }
    }
    else {
        for(let i = start; i >= end; i += step) {
            yield i;
        }
    }
}

export function range(start, end = null, step = 1) {
    return new Array(...irange(start, end, step));
}
