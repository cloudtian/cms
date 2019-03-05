import Mock from 'mockjs'

const Random = Mock.Random;

// 获取新闻列表数据
Mock.mock('/api/news/news_list', {
    'list|1-50': [{
        'id|+1': 1,
        'title': () => Random.csentence(),
        'description': () => Random.cparagraph(1,3),
        'click|0-100': 0,
        'add_time': () => Random.datetime(),
        'img_url': () => Random.image('80x80')
    }]
})