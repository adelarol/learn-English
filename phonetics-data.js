// 音标训练数据 · 英式(DJ) 44 音标骨架 + 美式对照
// 说明：id 使用英式符号本身（全表唯一）；uk/us 为两套体系符号（不含斜线，渲染时加 / /）
// words 中 uk/us 为该词的英式/美式音标；usNote 为英美差异说明（仅差异音有）
// 清辅音 voice='清'，浊辅音 voice='浊'，元音 voice=''

const PHONETICS_GROUPS = [
    { key: 'vs', name: '短元音', desc: '短促轻快，一拍即收' },
    { key: 'vl', name: '长元音', desc: '音要拉足，饱满持久' },
    { key: 'vd', name: '双元音', desc: '从一个音自然滑向另一个音' },
    { key: 'plosive', name: '爆破音', desc: '先憋气，再突然弹开' },
    { key: 'fricative', name: '摩擦音', desc: '气流从缝隙中挤出' },
    { key: 'affricate', name: '破擦音', desc: '先堵塞，后摩擦放开' },
    { key: 'nasal', name: '鼻音', desc: '气流从鼻腔通过' },
    { key: 'other', name: '边音 · 近音', desc: '舌侧气流 / 无阻碍滑音' },
    { key: 'cluster', name: '辅音连缀', desc: '两个辅音连读，一气呵成' }
];

const PHONEMES = [
    // ===== 短元音 =====
    { id: 'ɪ', group: 'vs', voice: '', uk: 'ɪ', us: 'ɪ',
      tips: '舌位中高、嘴角微收，短促松弛，似"一"但不绷紧。',
      trap: '常读成中文"衣"或拉成长音 /iː/。注意短促放松：ship ≠ sheep。',
      words: [
        { w: 'ship', uk: 'ʃɪp', us: 'ʃɪp', cn: '轮船' },
        { w: 'big', uk: 'bɪɡ', us: 'bɪɡ', cn: '大的' },
        { w: 'fish', uk: 'fɪʃ', us: 'fɪʃ', cn: '鱼' }
      ] },
    { id: 'e', group: 'vs', voice: '', uk: 'e', us: 'ɛ',
      tips: '舌前部半高，口半开，面部放松，似轻短的"哎"。',
      trap: '勿读成中文"诶"拖长；口型比 /æ/ 小。美式词典常写作 /ɛ/。',
      usNote: '美式词典常写作 /ɛ/：bed 英 /bed/ → 美 /bɛd/',
      words: [
        { w: 'bed', uk: 'bed', us: 'bɛd', cn: '床' },
        { w: 'pen', uk: 'pen', us: 'pɛn', cn: '钢笔' },
        { w: 'egg', uk: 'eɡ', us: 'ɛɡ', cn: '鸡蛋' }
      ] },
    { id: 'æ', group: 'vs', voice: '', uk: 'æ', us: 'æ',
      tips: '口大张，舌前部压低，下巴明显下沉，音短促。',
      trap: '中国学生常读成 /e/，bad 听着像 bed。口一定要张大。',
      words: [
        { w: 'cat', uk: 'kæt', us: 'kæt', cn: '猫' },
        { w: 'map', uk: 'mæp', us: 'mæp', cn: '地图' },
        { w: 'bad', uk: 'bæd', us: 'bæd', cn: '坏的' }
      ] },
    { id: 'ʌ', group: 'vs', voice: '', uk: 'ʌ', us: 'ʌ',
      tips: '舌居中央，口半开，短促浑厚，似轻声"啊"。',
      trap: '常读得过重像中文"啊"，或与长音 /ɑː/ 混淆。cup 不是"卡普"。',
      words: [
        { w: 'cup', uk: 'kʌp', us: 'kʌp', cn: '杯子' },
        { w: 'bus', uk: 'bʌs', us: 'bʌs', cn: '公交车' },
        { w: 'sun', uk: 'sʌn', us: 'sʌn', cn: '太阳' }
      ] },
    { id: 'ɒ', group: 'vs', voice: '', uk: 'ɒ', us: 'ɑː',
      tips: '双唇收圆，舌后部压低，短促。',
      trap: '与长音 /ɔː/ 不分（cot / caught）。美式无此音，并入 /ɑː/。',
      usNote: '美式无独立 /ɒ/，读作 /ɑː/：hot 英 /hɒt/ → 美 /hɑːt/',
      words: [
        { w: 'hot', uk: 'hɒt', us: 'hɑːt', cn: '热的' },
        { w: 'dog', uk: 'dɒɡ', us: 'dɔːɡ', cn: '狗' },
        { w: 'box', uk: 'bɒks', us: 'bɑːks', cn: '盒子' }
      ] },
    { id: 'ʊ', group: 'vs', voice: '', uk: 'ʊ', us: 'ʊ',
      tips: '双唇微圆，舌后部抬起，短促放松。',
      trap: '常读成中文"乌"过紧过长。与长音 /uː/ 的对比是关键：pull / pool。',
      words: [
        { w: 'book', uk: 'bʊk', us: 'bʊk', cn: '书' },
        { w: 'good', uk: 'ɡʊd', us: 'ɡʊd', cn: '好的' },
        { w: 'look', uk: 'lʊk', us: 'lʊk', cn: '看' }
      ] },
    { id: 'ə', group: 'vs', voice: '', uk: 'ə', us: 'ə',
      tips: '最轻最短的中央元音，全身放松，只出声不出力。',
      trap: '弱读音节常被读成满音。banana、about 里的 a/o 都应弱读成 /ə/，学会"偷懒"才地道。',
      words: [
        { w: 'about', uk: 'əˈbaʊt', us: 'əˈbaʊt', cn: '关于' },
        { w: 'sofa', uk: 'ˈsəʊfə', us: 'ˈsoʊfə', cn: '沙发' },
        { w: 'teacher', uk: 'ˈtiːtʃə', us: 'ˈtiːtʃər', cn: '老师' }
      ] },

    // ===== 长元音 =====
    { id: 'iː', group: 'vl', voice: '', uk: 'iː', us: 'iː',
      tips: '嘴角向两侧拉开像微笑，舌前部最高，音要拉足长度。',
      trap: '长度不足就变成 /ɪ/。sheep 要拖够拍，与 ship 天壤之别。',
      words: [
        { w: 'sheep', uk: 'ʃiːp', us: 'ʃiːp', cn: '绵羊' },
        { w: 'see', uk: 'siː', us: 'siː', cn: '看见' },
        { w: 'tea', uk: 'tiː', us: 'tiː', cn: '茶' }
      ] },
    { id: 'ɑː', group: 'vl', voice: '', uk: 'ɑː', us: 'ɑːr',
      tips: '口大张，舌后部压低，长而饱满。',
      trap: '与短音 /ʌ/ 混淆。美式后接 r 时要卷舌。',
      usNote: '美式后接 r 音时卷舌：car 英 /kɑː/ → 美 /kɑːr/',
      words: [
        { w: 'car', uk: 'kɑː', us: 'kɑːr', cn: '汽车' },
        { w: 'father', uk: 'ˈfɑːðə', us: 'ˈfɑːðər', cn: '父亲' },
        { w: 'heart', uk: 'hɑːt', us: 'hɑːrt', cn: '心脏' }
      ] },
    { id: 'ɔː', group: 'vl', voice: '', uk: 'ɔː', us: 'ɔː',
      tips: '双唇收圆前突，舌后部抬高，音拉长。',
      trap: '与短音 /ɒ/ 长短不分（cot / caught）。美式后接 r 时卷舌。',
      usNote: '美式后接 r 音时卷舌：door 英 /dɔː/ → 美 /dɔːr/',
      words: [
        { w: 'ball', uk: 'bɔːl', us: 'bɔːl', cn: '球' },
        { w: 'saw', uk: 'sɔː', us: 'sɔː', cn: '看见（过去式）' },
        { w: 'door', uk: 'dɔː', us: 'dɔːr', cn: '门' }
      ] },
    { id: 'uː', group: 'vl', voice: '', uk: 'uː', us: 'uː',
      tips: '双唇收圆收小并前突，舌后部最高，长音。',
      trap: '不要加中文"乌"的摩擦感。与短音 /ʊ/ 要分清：food 不是"福的"。',
      words: [
        { w: 'food', uk: 'fuːd', us: 'fuːd', cn: '食物' },
        { w: 'moon', uk: 'muːn', us: 'muːn', cn: '月亮' },
        { w: 'school', uk: 'skuːl', us: 'skuːl', cn: '学校' }
      ] },
    { id: 'ɜː', group: 'vl', voice: '', uk: 'ɜː', us: 'ɜːr',
      tips: '舌居中央，双唇中性微开，长音如低吟。',
      trap: '汉语无对应音，常读成开口过大的"额"。美式一律卷舌。',
      usNote: '美式一律卷舌：bird 英 /bɜːd/ → 美 /bɜːrd/',
      words: [
        { w: 'bird', uk: 'bɜːd', us: 'bɜːrd', cn: '鸟' },
        { w: 'girl', uk: 'ɡɜːl', us: 'ɡɜːrl', cn: '女孩' },
        { w: 'work', uk: 'wɜːk', us: 'wɜːrk', cn: '工作' }
      ] },

    // ===== 双元音 =====
    { id: 'eɪ', group: 'vd', voice: '', uk: 'eɪ', us: 'eɪ',
      tips: '从 /e/ 平滑滑向 /ɪ/，前重后轻。',
      trap: '读成中文"诶"单音不动。name 不是"内姆"，收尾要滑动。',
      words: [
        { w: 'day', uk: 'deɪ', us: 'deɪ', cn: '天' },
        { w: 'cake', uk: 'keɪk', us: 'keɪk', cn: '蛋糕' },
        { w: 'name', uk: 'neɪm', us: 'neɪm', cn: '名字' }
      ] },
    { id: 'aɪ', group: 'vd', voice: '', uk: 'aɪ', us: 'aɪ',
      tips: '从 /a/（口大开）滑向 /ɪ/，口型从大到小。',
      trap: '与中文"爱"接近但收尾要更紧。time 不是"太姆"。',
      words: [
        { w: 'time', uk: 'taɪm', us: 'taɪm', cn: '时间' },
        { w: 'five', uk: 'faɪv', us: 'faɪv', cn: '五' },
        { w: 'bike', uk: 'baɪk', us: 'baɪk', cn: '自行车' }
      ] },
    { id: 'ɔɪ', group: 'vd', voice: '', uk: 'ɔɪ', us: 'ɔɪ',
      tips: '从圆唇 /ɔ/ 滑向展唇 /ɪ/，由圆到扁。',
      trap: '首音圆唇不足会读成 /ɑɪ/。boy 不是"玻爱"。',
      words: [
        { w: 'boy', uk: 'bɔɪ', us: 'bɔɪ', cn: '男孩' },
        { w: 'toy', uk: 'tɔɪ', us: 'tɔɪ', cn: '玩具' },
        { w: 'coin', uk: 'kɔɪn', us: 'kɔɪn', cn: '硬币' }
      ] },
    { id: 'əʊ', group: 'vd', voice: '', uk: 'əʊ', us: 'oʊ',
      tips: '从中央 /ə/ 滑向 /ʊ/，收尾圆润。',
      trap: '读成中文"欧"而口型没有滑动过程。美式写作 /oʊ/。',
      usNote: '美式写作 /oʊ/：go 英 /ɡəʊ/ → 美 /ɡoʊ/',
      words: [
        { w: 'go', uk: 'ɡəʊ', us: 'ɡoʊ', cn: '去' },
        { w: 'home', uk: 'həʊm', us: 'hoʊm', cn: '家' },
        { w: 'boat', uk: 'bəʊt', us: 'boʊt', cn: '小船' }
      ] },
    { id: 'aʊ', group: 'vd', voice: '', uk: 'aʊ', us: 'aʊ',
      tips: '从口大开的 /a/ 滑向圆唇 /ʊ/，由大到圆。',
      trap: '与中文"傲"混淆，滑动要到位。now 不是"闹"。',
      words: [
        { w: 'now', uk: 'naʊ', us: 'naʊ', cn: '现在' },
        { w: 'house', uk: 'haʊs', us: 'haʊs', cn: '房子' },
        { w: 'cow', uk: 'kaʊ', us: 'kaʊ', cn: '奶牛' }
      ] },
    { id: 'ɪə', group: 'vd', voice: '', uk: 'ɪə', us: 'ɪr',
      tips: '从 /ɪ/ 滑向轻读的 /ə/，收尾轻。',
      trap: '两音粘连读成中文"伊尔"。美式卷舌读 /ɪr/。',
      usNote: '美式卷舌 /ɪr/：near 英 /nɪə/ → 美 /nɪr/',
      words: [
        { w: 'near', uk: 'nɪə', us: 'nɪr', cn: '近的' },
        { w: 'beer', uk: 'bɪə', us: 'bɪr', cn: '啤酒' },
        { w: 'here', uk: 'hɪə', us: 'hɪr', cn: '这里' }
      ] },
    { id: 'eə', group: 'vd', voice: '', uk: 'eə', us: 'er',
      tips: '从 /e/ 滑向轻读的 /ə/。',
      trap: '常读成单音 /e/ 丢掉滑动。美式卷舌读 /er/。',
      usNote: '美式卷舌 /er/：hair 英 /heə/ → 美 /her/',
      words: [
        { w: 'hair', uk: 'heə', us: 'her', cn: '头发' },
        { w: 'care', uk: 'keə', us: 'ker', cn: '关心' },
        { w: 'air', uk: 'eə', us: 'er', cn: '空气' }
      ] },
    { id: 'ʊə', group: 'vd', voice: '', uk: 'ʊə', us: 'ʊr',
      tips: '从 /ʊ/ 滑向轻读的 /ə/，是较弱的双元音。',
      trap: '常直接读成 /ɔː/。美式卷舌读 /ʊr/。',
      usNote: '美式卷舌 /ʊr/：tour 英 /tʊə/ → 美 /tʊr/',
      words: [
        { w: 'tour', uk: 'tʊə', us: 'tʊr', cn: '旅行' },
        { w: 'sure', uk: 'ʃʊə', us: 'ʃʊr', cn: '确定的' },
        { w: 'pure', uk: 'pjʊə', us: 'pjʊr', cn: '纯的' }
      ] },

    // ===== 爆破音 =====
    { id: 'p', group: 'plosive', voice: '清', uk: 'p', us: 'p',
      tips: '双唇闭紧憋气，突然放开送气，声带不振动。',
      trap: '送气不足听着像 /b/。paper 等词首送气要足。',
      words: [
        { w: 'pen', uk: 'pen', us: 'pen', cn: '钢笔' },
        { w: 'park', uk: 'pɑːk', us: 'pɑːrk', cn: '公园' },
        { w: 'happy', uk: 'ˈhæpi', us: 'ˈhæpi', cn: '开心的' }
      ] },
    { id: 't', group: 'plosive', voice: '清', uk: 't', us: 't',
      tips: '舌尖抵上齿龈，憋气后弹开送气，声带不振动。',
      trap: '读成中文"特"多了一个元音；词尾 t 要清晰勿吞（sit）。美式元音之间的 t 常闪读：water 听感近 "wader"。',
      usNote: '美式元音之间的 t 常闪读成近似 /d/：water 听感近 "wader"',
      words: [
        { w: 'ten', uk: 'ten', us: 'tɛn', cn: '十' },
        { w: 'sit', uk: 'sɪt', us: 'sɪt', cn: '坐' },
        { w: 'water', uk: 'ˈwɔːtə', us: 'ˈwɔːtər', cn: '水' }
      ] },
    { id: 'k', group: 'plosive', voice: '清', uk: 'k', us: 'k',
      tips: '舌后根抵软腭，憋气后弹开送气，声带不振动。',
      trap: '读成中文"科"加了元音。cat、king 词首送气要足。',
      words: [
        { w: 'cat', uk: 'kæt', us: 'kæt', cn: '猫' },
        { w: 'king', uk: 'kɪŋ', us: 'kɪŋ', cn: '国王' },
        { w: 'back', uk: 'bæk', us: 'bæk', cn: '后面' }
      ] },
    { id: 'b', group: 'plosive', voice: '浊', uk: 'b', us: 'b',
      tips: '双唇闭紧，声带振动，突然放开，送气很弱。',
      trap: '与 /p/ 的区别在于：b 声带振动且送气弱，p 送气强。',
      words: [
        { w: 'book', uk: 'bʊk', us: 'bʊk', cn: '书' },
        { w: 'big', uk: 'bɪɡ', us: 'bɪɡ', cn: '大的' },
        { w: 'table', uk: 'ˈteɪbl', us: 'ˈteɪbl', cn: '桌子' }
      ] },
    { id: 'd', group: 'plosive', voice: '浊', uk: 'd', us: 'd',
      tips: '舌尖抵上齿龈，声带振动，弹开放开。',
      trap: '读成中文"得"加了元音；词尾 d 要清晰（read）。',
      words: [
        { w: 'day', uk: 'deɪ', us: 'deɪ', cn: '天' },
        { w: 'read', uk: 'riːd', us: 'riːd', cn: '读' },
        { w: 'hand', uk: 'hænd', us: 'hænd', cn: '手' }
      ] },
    { id: 'ɡ', group: 'plosive', voice: '浊', uk: 'ɡ', us: 'ɡ',
      tips: '舌后根抵软腭，声带振动，弹开放开。',
      trap: '读成中文"哥"加了元音；good 词尾勿吞。',
      words: [
        { w: 'girl', uk: 'ɡɜːl', us: 'ɡɜːrl', cn: '女孩' },
        { w: 'go', uk: 'ɡəʊ', us: 'ɡoʊ', cn: '去' },
        { w: 'egg', uk: 'eɡ', us: 'ɛɡ', cn: '鸡蛋' }
      ] },

    // ===== 摩擦音 =====
    { id: 'f', group: 'fricative', voice: '清', uk: 'f', us: 'f',
      tips: '上齿轻咬下唇，气流从缝隙摩擦而出，声带不振动。',
      trap: '与 /v/ 不分（five 听着像 vibe）。上齿必须碰到下唇。',
      words: [
        { w: 'five', uk: 'faɪv', us: 'faɪv', cn: '五' },
        { w: 'fish', uk: 'fɪʃ', us: 'fɪʃ', cn: '鱼' },
        { w: 'life', uk: 'laɪf', us: 'laɪf', cn: '生活' }
      ] },
    { id: 'v', group: 'fricative', voice: '浊', uk: 'v', us: 'v',
      tips: '上齿咬下唇，气流摩擦而出，声带振动。',
      trap: '汉语没有 v，常读成 /w/（very 听着像 wary）。上齿碰下唇并振动声带。',
      words: [
        { w: 'very', uk: 'ˈveri', us: 'ˈveri', cn: '非常' },
        { w: 'love', uk: 'lʌv', us: 'lʌv', cn: '爱' },
        { w: 'voice', uk: 'vɔɪs', us: 'vɔɪs', cn: '声音' }
      ] },
    { id: 'θ', group: 'fricative', voice: '清', uk: 'θ', us: 'θ',
      tips: '舌尖轻伸到上下齿之间，气流摩擦而出，声带不振动。',
      trap: '汉语没有这个音，常读成 /s/（think → sink）。一定要伸舌头。',
      words: [
        { w: 'think', uk: 'θɪŋk', us: 'θɪŋk', cn: '思考' },
        { w: 'three', uk: 'θriː', us: 'θriː', cn: '三' },
        { w: 'mouth', uk: 'maʊθ', us: 'maʊθ', cn: '嘴' }
      ] },
    { id: 'ð', group: 'fricative', voice: '浊', uk: 'ð', us: 'ð',
      tips: '/θ/ 的浊音：舌尖齿间，气流摩擦，声带振动。',
      trap: '常读成 /z/ 或 /d/（this → zis/dis）。the 里也要咬舌。',
      words: [
        { w: 'this', uk: 'ðɪs', us: 'ðɪs', cn: '这' },
        { w: 'mother', uk: 'ˈmʌðə', us: 'ˈmʌðər', cn: '母亲' },
        { w: 'with', uk: 'wɪð', us: 'wɪð', cn: '和…一起' }
      ] },
    { id: 's', group: 'fricative', voice: '清', uk: 's', us: 's',
      tips: '舌尖靠近上齿龈，气流从窄缝摩擦而出。',
      trap: '与 /θ/ 不分（sink / think）。汉语的"斯"舌位偏后，s 舌尖更靠前。',
      words: [
        { w: 'sun', uk: 'sʌn', us: 'sʌn', cn: '太阳' },
        { w: 'see', uk: 'siː', us: 'siː', cn: '看见' },
        { w: 'miss', uk: 'mɪs', us: 'mɪs', cn: '想念' }
      ] },
    { id: 'z', group: 'fricative', voice: '浊', uk: 'z', us: 'z',
      tips: '/s/ 的浊音：口型舌位同 s，声带振动。',
      trap: '词尾 z 常被读成 /s/（eyes 不要读成"爱斯"）。声带要振动。',
      words: [
        { w: 'zoo', uk: 'zuː', us: 'zuː', cn: '动物园' },
        { w: 'nose', uk: 'nəʊz', us: 'noʊz', cn: '鼻子' },
        { w: 'eyes', uk: 'aɪz', us: 'aɪz', cn: '眼睛' }
      ] },
    { id: 'ʃ', group: 'fricative', voice: '清', uk: 'ʃ', us: 'ʃ',
      tips: '双唇略前突，舌面抬向硬腭前部，如轻声"嘘"。',
      trap: '与 /s/ 不分（sheep / seep）。双唇一定要前突。',
      words: [
        { w: 'she', uk: 'ʃiː', us: 'ʃiː', cn: '她' },
        { w: 'shop', uk: 'ʃɒp', us: 'ʃɑːp', cn: '商店' },
        { w: 'wish', uk: 'wɪʃ', us: 'wɪʃ', cn: '愿望' }
      ] },
    { id: 'ʒ', group: 'fricative', voice: '浊', uk: 'ʒ', us: 'ʒ',
      tips: '/ʃ/ 的浊音：口型舌位同 ʃ，声带振动。',
      trap: '汉语没有，常读成 /ʃ/ 或中文"日"。只出现在少数词：usually、vision、measure。',
      words: [
        { w: 'usually', uk: 'ˈjuːʒuəli', us: 'ˈjuːʒuəli', cn: '通常' },
        { w: 'television', uk: 'ˈtelɪvɪʒn', us: 'ˈtelɪvɪʒn', cn: '电视' },
        { w: 'measure', uk: 'ˈmeʒə', us: 'ˈmeʒər', cn: '测量' }
      ] },
    { id: 'h', group: 'fricative', voice: '清', uk: 'h', us: 'h',
      tips: '声道自然打开，气流轻轻呼出，像对着镜子哈气。',
      trap: '勿吞掉 h（hour 是例外），也不要读成中文"喝"带元音。美式 h 更轻。',
      words: [
        { w: 'hat', uk: 'hæt', us: 'hæt', cn: '帽子' },
        { w: 'home', uk: 'həʊm', us: 'hoʊm', cn: '家' },
        { w: 'behind', uk: 'bɪˈhaɪnd', us: 'bɪˈhaɪnd', cn: '在后面' }
      ] },

    // ===== 破擦音 =====
    { id: 'tʃ', group: 'affricate', voice: '清', uk: 'tʃ', us: 'tʃ',
      tips: '/t/ 与 /ʃ/ 连读：先堵塞，再摩擦放开，声带不振动。',
      trap: '与 /ʃ/ 不分（chair / share）。堵塞-放开的过程要完整。',
      words: [
        { w: 'chair', uk: 'tʃeə', us: 'tʃer', cn: '椅子' },
        { w: 'lunch', uk: 'lʌntʃ', us: 'lʌntʃ', cn: '午餐' },
        { w: 'watch', uk: 'wɒtʃ', us: 'wɑːtʃ', cn: '手表' }
      ] },
    { id: 'dʒ', group: 'affricate', voice: '浊', uk: 'dʒ', us: 'dʒ',
      tips: '/tʃ/ 的浊音：先堵塞再摩擦放开，声带振动。',
      trap: '与 /tʃ/ 不分（job / chop）。声带振动是关键。',
      words: [
        { w: 'job', uk: 'dʒɒb', us: 'dʒɑːb', cn: '工作' },
        { w: 'jump', uk: 'dʒʌmp', us: 'dʒʌmp', cn: '跳' },
        { w: 'page', uk: 'peɪdʒ', us: 'peɪdʒ', cn: '页' }
      ] },

    // ===== 鼻音 =====
    { id: 'm', group: 'nasal', voice: '浊', uk: 'm', us: 'm',
      tips: '双唇闭合，气流全部从鼻腔通过，声带振动。',
      trap: '词尾 m 后不要再加元音（some 不要读成"萨姆"）。闭唇要完整。',
      words: [
        { w: 'man', uk: 'mæn', us: 'mæn', cn: '男人' },
        { w: 'moon', uk: 'muːn', us: 'muːn', cn: '月亮' },
        { w: 'name', uk: 'neɪm', us: 'neɪm', cn: '名字' }
      ] },
    { id: 'n', group: 'nasal', voice: '浊', uk: 'n', us: 'n',
      tips: '舌尖抵上齿龈，气流从鼻腔通过，声带振动。',
      trap: '与 /l/ 混（light / night）、与 /ŋ/ 混（sin / sing）。舌尖位置是关键。',
      words: [
        { w: 'nose', uk: 'nəʊz', us: 'noʊz', cn: '鼻子' },
        { w: 'nine', uk: 'naɪn', us: 'naɪn', cn: '九' },
        { w: 'banana', uk: 'bəˈnɑːnə', us: 'bəˈnænə', cn: '香蕉' }
      ] },
    { id: 'ŋ', group: 'nasal', voice: '浊', uk: 'ŋ', us: 'ŋ',
      tips: '舌后根抵软腭，气流从鼻腔通过，似"嗯"的后半段。',
      trap: '词尾常加出 g 音（sing 读成"星格"）。g 只堵不爆。',
      words: [
        { w: 'king', uk: 'kɪŋ', us: 'kɪŋ', cn: '国王' },
        { w: 'sing', uk: 'sɪŋ', us: 'sɪŋ', cn: '唱歌' },
        { w: 'long', uk: 'lɒŋ', us: 'lɔːŋ', cn: '长的' }
      ] },

    // ===== 边音 · 近音 =====
    { id: 'l', group: 'other', voice: '浊', uk: 'l', us: 'l',
      tips: '舌尖抵上齿龈，气流从舌两侧通过，声带振动。',
      trap: '词首是清晰的 /l/（light），词尾舌根抬起变"暗"（feel）。与 /n/ /r/ 常混。',
      words: [
        { w: 'light', uk: 'laɪt', us: 'laɪt', cn: '灯' },
        { w: 'feel', uk: 'fiːl', us: 'fiːl', cn: '感觉' },
        { w: 'milk', uk: 'mɪlk', us: 'mɪlk', cn: '牛奶' }
      ] },
    { id: 'r', group: 'other', voice: '浊', uk: 'r', us: 'r',
      tips: '舌尖卷起但不触碰任何部位，双唇略圆，气流无阻滑出。',
      trap: '不要读成中文"日"（摩擦太重）。美式 r 卷舌更明显，词尾 r 要发出来：car 美 /kɑːr/。',
      usNote: '美式卷舌更明显，词尾 r 要发出来：car 美 /kɑːr/',
      words: [
        { w: 'red', uk: 'red', us: 'red', cn: '红色' },
        { w: 'rain', uk: 'reɪn', us: 'reɪn', cn: '雨' },
        { w: 'car', uk: 'kɑː', us: 'kɑːr', cn: '汽车' }
      ] },
    { id: 'j', group: 'other', voice: '浊', uk: 'j', us: 'j',
      tips: '舌前部抬向硬腭，快速滑向后面的元音，似"耶"的起头。',
      trap: '不能只读成中文"一"，要向后滑动。use、music 里的 /j/ 勿丢。',
      words: [
        { w: 'yes', uk: 'jes', us: 'jes', cn: '是的' },
        { w: 'use', uk: 'juːz', us: 'juːz', cn: '使用' },
        { w: 'music', uk: 'ˈmjuːzɪk', us: 'ˈmjuːzɪk', cn: '音乐' }
      ] },
    { id: 'w', group: 'other', voice: '浊', uk: 'w', us: 'w',
      tips: '双唇收圆，快速滑向后面的元音。',
      trap: '与 /v/ 混（vet / wet）。w 圆唇不碰齿，v 上齿咬下唇。',
      words: [
        { w: 'we', uk: 'wiː', us: 'wiː', cn: '我们' },
        { w: 'window', uk: 'ˈwɪndəʊ', us: 'ˈwɪndoʊ', cn: '窗户' },
        { w: 'one', uk: 'wʌn', us: 'wʌn', cn: '一' }
      ] },

    // ===== 辅音连缀 =====
    { id: 'ts', group: 'cluster', voice: '清', uk: 'ts', us: 'ts',
      tips: '/t/ 与 /s/ 连读：先憋气堵住，再摩擦放开，中间不停顿。',
      trap: '不要读成中文"次"加元音；cats 词尾要轻促干净。',
      words: [
        { w: 'cats', uk: 'kæts', us: 'kæts', cn: '猫（复数）' },
        { w: 'bits', uk: 'bɪts', us: 'bɪts', cn: '碎片' },
        { w: 'meets', uk: 'miːts', us: 'miːts', cn: '遇见' }
      ] },
    { id: 'dz', group: 'cluster', voice: '浊', uk: 'dz', us: 'dz',
      tips: '/d/ 与 /z/ 连读：声带振动，堵塞后摩擦放开。',
      trap: '词尾常被吞掉或读成 /s/。beds 的 d 要轻碰齿龈再滑向 z。',
      words: [
        { w: 'beds', uk: 'bedz', us: 'bɛdz', cn: '床（复数）' },
        { w: 'needs', uk: 'niːdz', us: 'niːdz', cn: '需要' },
        { w: 'words', uk: 'wɜːdz', us: 'wɜːrdz', cn: '单词' }
      ] },
    { id: 'tr', group: 'cluster', voice: '清', uk: 'tr', us: 'tr',
      tips: '/t/ 与 /r/ 连读：舌尖从齿龈直接卷起，一次成音。',
      trap: '不要读成中文"戳"或"出"，/t/ 与 /r/ 之间不能有元音。',
      words: [
        { w: 'tree', uk: 'triː', us: 'triː', cn: '树' },
        { w: 'try', uk: 'traɪ', us: 'traɪ', cn: '尝试' },
        { w: 'train', uk: 'treɪn', us: 'treɪn', cn: '火车' }
      ] },
    { id: 'dr', group: 'cluster', voice: '浊', uk: 'dr', us: 'dr',
      tips: '/d/ 与 /r/ 连读：声带振动，舌尖从齿龈卷起滑出。',
      trap: '与 /dʒ/ 混（dream 听着像 "jream"）。d 要清晰再滑向 r。',
      words: [
        { w: 'dream', uk: 'driː', us: 'driː', cn: '梦' },
        { w: 'drink', uk: 'drɪŋk', us: 'drɪŋk', cn: '喝' },
        { w: 'drive', uk: 'draɪv', us: 'draɪv', cn: '驾驶' }
      ] }
];

// 最小对立组：针对中国学习者的高频痛点音对
// p: 涉及的两个音标（id）；a/b: 两个例词（a 对应 p[0]）；note: 补充说明
const MINIMAL_PAIRS = [
    { id: 'ship-sheep', p: ['ɪ', 'iː'],
      a: { w: 'ship', uk: 'ʃɪp', us: 'ʃɪp', cn: '轮船' },
      b: { w: 'sheep', uk: 'ʃiːp', us: 'ʃiːp', cn: '绵羊' },
      note: '长短元音之差，一词之差意义大不同' },
    { id: 'bed-bad', p: ['e', 'æ'],
      a: { w: 'bed', uk: 'bed', us: 'bɛd', cn: '床' },
      b: { w: 'bad', uk: 'bæd', us: 'bæd', cn: '坏的' },
      note: '/æ/ 口要张得更大' },
    { id: 'cap-cup', p: ['æ', 'ʌ'],
      a: { w: 'cap', uk: 'kæp', us: 'kæp', cn: '帽子' },
      b: { w: 'cup', uk: 'kʌp', us: 'kʌp', cn: '杯子' },
      note: '前元音 vs 中央元音' },
    { id: 'cot-caught', p: ['ɒ', 'ɔː'],
      a: { w: 'cot', uk: 'kɒt', us: 'kɑːt', cn: '小床' },
      b: { w: 'caught', uk: 'kɔːt', us: 'kɔːt', cn: '捕捉（过去式）' },
      note: '美音下 /ɒ/ 读作 /ɑː/，对比依然成立' },
    { id: 'pull-pool', p: ['ʊ', 'uː'],
      a: { w: 'pull', uk: 'pʊl', us: 'pʊl', cn: '拉' },
      b: { w: 'pool', uk: 'puːl', us: 'puːl', cn: '游泳池' },
      note: '短促放松 vs 长而紧圆' },
    { id: 'late-let', p: ['eɪ', 'e'],
      a: { w: 'late', uk: 'leɪt', us: 'leɪt', cn: '迟的' },
      b: { w: 'let', uk: 'let', us: 'lɛt', cn: '让' },
      note: '双元音滑动 vs 单元音' },
    { id: 'coat-caught', p: ['əʊ', 'ɔː'],
      a: { w: 'coat', uk: 'kəʊt', us: 'koʊt', cn: '外套' },
      b: { w: 'caught', uk: 'kɔːt', us: 'kɔːt', cn: '捕捉（过去式）' },
      note: '美音写法不同但对比清晰' },
    { id: 'think-sink', p: ['θ', 's'],
      a: { w: 'think', uk: 'θɪŋk', us: 'θɪŋk', cn: '思考' },
      b: { w: 'sink', uk: 'sɪŋk', us: 'sɪŋk', cn: '水槽' },
      note: '咬舌音，中国学习者头号难点' },
    { id: 'they-day', p: ['ð', 'd'],
      a: { w: 'they', uk: 'ðeɪ', us: 'ðeɪ', cn: '他们' },
      b: { w: 'day', uk: 'deɪ', us: 'deɪ', cn: '天' },
      note: '齿间浊擦音 vs 爆破音' },
    { id: 'vet-wet', p: ['v', 'w'],
      a: { w: 'vet', uk: 'vet', us: 'vɛt', cn: '兽医' },
      b: { w: 'wet', uk: 'wet', us: 'wɛt', cn: '湿的' },
      note: 'v 咬下唇，w 圆唇' },
    { id: 'boat-vote', p: ['b', 'v'],
      a: { w: 'boat', uk: 'bəʊt', us: 'boʊt', cn: '小船' },
      b: { w: 'vote', uk: 'vəʊt', us: 'voʊt', cn: '投票' },
      note: '爆破 vs 摩擦' },
    { id: 'light-night', p: ['l', 'n'],
      a: { w: 'light', uk: 'laɪt', us: 'laɪt', cn: '灯' },
      b: { w: 'night', uk: 'naɪt', us: 'naɪt', cn: '夜晚' },
      note: '舌侧气流 vs 鼻腔气流' },
    { id: 'light-right', p: ['l', 'r'],
      a: { w: 'light', uk: 'laɪt', us: 'laɪt', cn: '灯' },
      b: { w: 'right', uk: 'raɪt', us: 'raɪt', cn: '正确的' },
      note: '舌尖抵齿龈 vs 卷起不触碰' },
    { id: 'sin-sing', p: ['n', 'ŋ'],
      a: { w: 'sin', uk: 'sɪn', us: 'sɪn', cn: '罪' },
      b: { w: 'sing', uk: 'sɪŋ', us: 'sɪŋ', cn: '唱歌' },
      note: '舌尖鼻音 vs 舌根鼻音' },
    { id: 'chair-share', p: ['tʃ', 'ʃ'],
      a: { w: 'chair', uk: 'tʃeə', us: 'tʃer', cn: '椅子' },
      b: { w: 'share', uk: 'ʃeə', us: 'ʃer', cn: '分享' },
      note: '有无开头堵塞过程' }
];

// 音标本音：slug 对应离线生成的音频 audio/phonetics/{uk|us}/{slug}.wav（Piper 本地 TTS 一次生成）
// tone 为浏览器 TTS 近似拼写载体（音频文件缺失时的兜底，跟随当前口音语音槽朗读）；
// tone 为 null 时回退到代表词发音。改音标表时需同步 tools/gen_phenome_audio.py 中的生成清单。
const PHONEME_SLUGS = {
    'ɪ': ['ih', 'ih'],   'e': ['e', 'eh'],    'æ': ['ae', 'aah'],  'ʌ': ['uh', 'uh'],
    'ɒ': ['o', null],    'ʊ': ['u', null],    'ə': ['schwa', null],
    'iː': ['ee', 'ee'],  'ɑː': ['ah', 'ah'],  'ɔː': ['aw', 'aw'],
    'uː': ['oo', 'oo'],  'ɜː': ['er', 'err'],
    'eɪ': ['ay', 'ay'],  'aɪ': ['eye', 'eye'], 'ɔɪ': ['oy', 'oy'],
    'əʊ': ['oh', 'oh'],  'aʊ': ['ow', 'ow'],  'ɪə': ['ear', 'ear'],
    'eə': ['air', 'air'], 'ʊə': ['oor', 'oor'],
    'p': ['p', 'puh'],   'b': ['b', 'buh'],   't': ['t', 'tuh'],   'd': ['d', 'duh'],
    'k': ['k', 'kuh'],   'ɡ': ['g', 'guh'],
    'f': ['f', 'fuh'],   'v': ['v', 'vuh'],   'θ': ['th', 'thuh'], 'ð': ['dh', 'thuh'],
    's': ['s', 'suh'],   'z': ['z', 'zuh'],   'ʃ': ['sh', 'shh'],  'ʒ': ['zh', 'zhuh'],
    'h': ['h', 'huh'],
    'tʃ': ['ch', 'chuh'], 'dʒ': ['j', 'juh'],
    'm': ['m', 'muh'],   'n': ['n', 'nuh'],   'ŋ': ['ng', null],
    'l': ['l', 'luh'],   'r': ['r', 'ruh'],   'j': ['y', 'yuh'],   'w': ['w', 'wuh'],
    'ts': ['ts', null],  'dz': ['dz', null],  'tr': ['tr', null],  'dr': ['dr', null]
};
// 把 slug/tone 绑定到每条音标数据上
PHONEMES.forEach(p => {
    const m = PHONEME_SLUGS[p.id];
    if (m) { p.slug = m[0]; p.tone = m[1]; }
});
