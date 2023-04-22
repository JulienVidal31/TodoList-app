export function createElement(tagName, attributes = {}) { //a comprendre ...
    const element = document.createElement(tagName)
    for (const [attribute, value] of Object.entries(attributes)) {
        if (value !== false && value !==null) {
            element.setAttribute(attribute, value)
        }
    }
    return element
}