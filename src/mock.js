import Mock from 'mockjs'

Mock.mock('/api/data', {
    'age|1-100': 100
})