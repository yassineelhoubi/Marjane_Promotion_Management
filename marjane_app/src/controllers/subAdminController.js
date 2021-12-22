const testSubAdmin = async (req, res, next) => {
    try {

        console.log('testSubAdmin')
        res.json()
    } catch (error) {
        res.status(400).json({
            message: error.message,
            error: true
        })
    }
}

export  {
    testSubAdmin,
}