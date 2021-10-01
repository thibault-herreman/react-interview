export default function(category = [], action) {
    if (action.type === 'addCategory') {
        return action.category;
    } else {
        return category;
    }
}