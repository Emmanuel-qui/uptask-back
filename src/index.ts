import colors from 'colors'
import serve from './serve'

const port = process.env.PORT || 4000

serve.listen(port, () => {
    console.log(colors.cyan.bold(`Server listening on port ${port}`));
})

