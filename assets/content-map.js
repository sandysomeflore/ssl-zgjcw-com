// assets/content-map.js
// 站点内容分区与关键词标签映射

const siteConfig = {
  baseUrl: 'https://ssl-zgjcw.com',
  siteName: '中国竞彩网',
  version: '1.2.0'
};

const contentSections = [
  {
    id: 'home',
    title: '首页',
    path: '/',
    tags: ['竞彩', '足球', '篮球', '最新动态'],
    keywords: ['中国竞彩网', '竞彩足球', '竞彩篮球', '开奖']
  },
  {
    id: 'football',
    title: '足球竞彩',
    path: '/football',
    tags: ['英超', '西甲', '德甲', '意甲', '法甲', '欧冠'],
    keywords: ['足球推荐', '竞彩足球预测', '五大联赛', '足球比分']
  },
  {
    id: 'basketball',
    title: '篮球竞彩',
    path: '/basketball',
    tags: ['NBA', 'CBA', '欧洲篮球', '世界杯'],
    keywords: ['篮球推荐', '竞彩篮球分析', 'NBA赛程', '篮球指数']
  },
  {
    id: 'lottery',
    title: '数字彩',
    path: '/lottery',
    tags: ['大乐透', '双色球', '福彩3D', '排列三'],
    keywords: ['大乐透开奖', '双色球预测', '数字彩推荐', '彩票技巧']
  },
  {
    id: 'news',
    title: '资讯中心',
    path: '/news',
    tags: ['赛事新闻', '专家分析', '数据统计', '转会信息'],
    keywords: ['竞彩资讯', '赛事前瞻', '赔率分析', '投注指南']
  },
  {
    id: 'tools',
    title: '实用工具',
    path: '/tools',
    tags: ['奖金计算器', '过关统计', '走势图表', '模拟投注'],
    keywords: ['竞彩计算器', '奖金模拟', '过关方式', '胆拖投注']
  }
];

// 关键词标签索引
const keywordIndex = {};
contentSections.forEach(section => {
  const allTerms = [...section.tags, ...section.keywords];
  allTerms.forEach(term => {
    if (!keywordIndex[term]) {
      keywordIndex[term] = [];
    }
    if (!keywordIndex[term].includes(section.id)) {
      keywordIndex[term].push(section.id);
    }
  });
});

// 搜索过滤函数
function searchContent(query) {
  if (!query || typeof query !== 'string') return [];
  const trimmed = query.trim().toLowerCase();
  if (trimmed.length === 0) return [];

  const matchedIds = new Set();
  const sections = [];

  // 精确匹配
  for (const term in keywordIndex) {
    if (term.toLowerCase() === trimmed) {
      keywordIndex[term].forEach(id => matchedIds.add(id));
    }
  }

  // 模糊匹配
  for (const term in keywordIndex) {
    if (term.toLowerCase().includes(trimmed)) {
      keywordIndex[term].forEach(id => matchedIds.add(id));
    }
  }

  // 按匹配度排序
  const exactMatches = [];
  const fuzzyMatches = [];
  matchedIds.forEach(id => {
    const section = contentSections.find(s => s.id === id);
    if (!section) return;
    const hasExact = section.tags.some(t => t.toLowerCase() === trimmed) ||
                     section.keywords.some(k => k.toLowerCase() === trimmed);
    if (hasExact) {
      exactMatches.push(section);
    } else {
      fuzzyMatches.push(section);
    }
  });

  return [...exactMatches, ...fuzzyMatches];
}

// 根据标签获取相关分区
function getSectionsByTag(tag) {
  if (!tag || typeof tag !== 'string') return [];
  const tagLower = tag.trim().toLowerCase();
  return contentSections.filter(section =>
    section.tags.some(t => t.toLowerCase() === tagLower) ||
    section.keywords.some(k => k.toLowerCase() === tagLower)
  );
}

// 获取所有标签列表
function getAllTags() {
  const tagSet = new Set();
  contentSections.forEach(section => {
    section.tags.forEach(tag => tagSet.add(tag));
    section.keywords.forEach(keyword => tagSet.add(keyword));
  });
  return Array.from(tagSet).sort();
}

// 示例用法（非必要，但便于测试）
// console.log(searchContent('竞彩'));
// console.log(getSectionsByTag('NBA'));
// console.log(getAllTags());

export {
  siteConfig,
  contentSections,
  keywordIndex,
  searchContent,
  getSectionsByTag,
  getAllTags
};