export default function(categoryReduc = [], action) {
    if (action.type === 'addCategory') {
        return action.categoryReduc;
    } else {
        return categoryReduc;
    }
}