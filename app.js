import initModel from './model';
import view from './view';
import update from './controller';

function app(initModel, update, view, node) {
    const dd = new diffDOM();

    let model = initModel;
    node.append(view(dispatch, model));
    function dispatch(msg) {
        model = update(msg, model);
        const updatedView = view(dispatch, model);
        const patches = dd.diff(node[0].firstChild, updatedView[0]);
        dd.apply(node[0].firstChild, patches);
    }
}

const rootNode = $('#app');

app(initModel, update, view, rootNode);
