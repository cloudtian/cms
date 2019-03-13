import Mock from 'mockjs'

const Random = Mock.Random;

// 新闻资讯 ---------------------------------------------------------

// 获取新闻列表数据
Mock.mock('/api/news/news_list', {
    'list|1-50': [{
        'id|+1': 1,
        'title': () => Random.ctitle(5, 20),
        'description': () => Random.cparagraph(1, 3),
        'click|0-1000': 0,
        'add_time': () => Random.date(),
        'img_url': () => Random.image('80x80')
    }]
})

// 传入news.id获取
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
        }
    }
})

// 改用静态数据
// Mock.mock('/api/photo/category', {
//     'category|3-10': [{
//         'id|+1': 1,
//         'text': () => Random.cword(4)
//     }]
// })

function getUrlParams (url) {
    let params = url.split('?')[1] || '';
    let obj = {};
    params.split('&').forEach(item => {
        let keyValue = item.split('=');
        obj[keyValue[0]] = keyValue[1];
    });
    return obj;
} 



// 图文分享 ---------------------------------------------------------

let photo = {
    10: {list: []}
};
// 传入category.id获取
Mock.mock(/\/api\/photo\/list/, 'get', (res) => {
    let id = getUrlParams(res.url).id;
    if (photo[id]) {
        return photo[id];
    }
    let data = Mock.mock({
        'list|0-10': [{
            'id|+1': 1,
            'img_url': () => Random.image('300x250'),
            'description': () => Random.cparagraph(1, 3)
        }]
    });

    photo[id] = data;
    return data;
})

let photoDetail = {};
Mock.mock(/\/api\/photo\/detail\/info/, 'get', res => {
    let id = getUrlParams(res.url).id;
    if (photoDetail[id]) {
        return photoDetail[id];
    }
    let data = Mock.mock({
        'info': {
            'id': id,
            'click|0-1000': 0,
            'title': () => Random.ctitle(5, 20),
            'add_time': () => Random.date(),
            'type': () => Random.cword(4),
            'content': () => {
                let result = [];
                let num = Random.natural(1, 3);
                for (let i = 0; i < num; i ++) {
                    let pFn = () => Random.cparagraph(1, 4);
                    let p = `<p>${pFn()}</p>`;
                    result.push(p);
                }
                return result.join('');
            }
        }
    });

    photoDetail[id] = data;
    return data;
})

Mock.mock(/\/api\/photo\/detail\/img/, 'get', {   
    'img|2-9': [{
        'src': () => Random.image('200x200'),
        'msrc': () => Random.image('80x80'),
        'alt': () => Random.cword(5),
        'title': () => Random.ctitle(5, 10)
    }]
})

// 评论---------------------------------------------------------
let comment = {};
Mock.mock(/\/api\/comment/, 'get', res => {  
    let id = getUrlParams(res.url).art_id;
    if (comment[id]) {
        return comment[id];
    }
    let data = Mock.mock({
        'comments|0-20': [{
            'user_name': () => Random.ctitle(2, 5),
            'content': () => Random.csentence(),
            'add_time': () => Random.date()
        }]
    });

    comment[id] = data;
    return data;
})
