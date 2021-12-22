const testDepartmentManager = async (req, res, next) => {
    try {

        console.log('testDepartmentManager')
        res.json()
    } catch (error) {
        res.status(400).json({
            message: error.message,
            error: true
        })
    }
}

export  {
    testDepartmentManager,
}