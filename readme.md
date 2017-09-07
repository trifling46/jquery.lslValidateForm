1、如果横向展示tip，input 的父元素定位必须为 position:relative
2、每个input 必须在独立的父元素包围下，且input必须要与左侧label同一等级，否则会出现tip定位错误
3、data-vtype 必填，所有需要验证的input都是根据它来查找的
4、当垂直提示方式时，input父元素的高度必须是auto（不能设置固定值）
5、