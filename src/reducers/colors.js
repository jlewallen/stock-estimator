import ColorScheme from './color-scheme.min';
import _ from "lodash";

const scm = new ColorScheme();
scm.from_hue(226)
    .scheme('tetrade')
    .distance(0.5)
    .add_complement(false)
    .variation('default')
    .web_safe(false);

const colors = scm.colors();
let i = 0;

export function assignColor(item) {
    if (_.isArray(item)) {
        _(item).each(assignColor);
    }
    else if (_.isObject(item)) {
        if (!_.isString(item.color)) {
            item.color = colors[i++ % colors.length];
        }
    }
    return item;
};
