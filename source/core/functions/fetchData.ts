const fetchData = async <T>(path: string, init?: RequestInit): Promise<T> => {
    const response = await fetch(path, init)

    if (response.ok === false) {
        throw new Error("Network response error: " + response.status)
    }

    return await response.json()
}

export default fetchData
