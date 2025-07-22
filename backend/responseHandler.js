module.exports = (res, response) => {
    try {
        if (response.error) {
            throw response.error
        }
        return res.send({
            status: 200,
            data: response.response,
            
        })
    } catch (error) {
        return res.send({
            status: 400,
            error: error,
            data: {},
        })
    }
}