import Mock from 'mockjs'

const Random = Mock.Random;

// 获取新闻列表数据
Mock.mock('/api/news/news_list', {
    'list|1-50': [{
        'id|+1': 1,
        'title': () => Random.ctitle(5, 20),
        'description': () => Random.cparagraph(1,3),
        'click|0-1000': 0,
        'add_time': () => Random.date(),
        'img_url': () => Random.image('80x80')
    }]
})

Mock.mock('/api/news/news_detail', {
    'info': {
        'id': () => Random.natural(),
        'click|0-1000': 0,
        'title': () => Random.ctitle(5, 20),
        'add_time': () => Random.date(),
        'type': () => Random.cword(4),
        'content': () => {
            let result = [];
            let num = Random.natural(2, 10);
            for (let i = 0; i < num; i ++) {
                let pFn = () => Random.cparagraph(1, 10);
                let p = `<p>${pFn()}</p>`;
                result.push(p);
            }
            return result.join('');
        },
    }
})