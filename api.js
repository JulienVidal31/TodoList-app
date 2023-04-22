export async function fetchJSON () {
    const url = "https://jsonplaceholder.typicode.com/todos?_limit=5"
    const fetchResult = await fetch(url)
    if (fetchResult.ok) {
        const data = await fetchResult.json()
        // console.log(fetchResult)
        // console.log(data)
        return data
    }
    throw new Error('Erreur server', {cause: fetchResult})
}

