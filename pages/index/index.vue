<template>
	<view> 
		<view>
           <uni-list>
           	<uni-list-item
           		:title="article.title"
           		show-arrow="false"
           		show-extra-icon="true"
           		:extra-icon="{ color: '#f58569', size: '22', type: 'starhalf' }"
           		v-for="(article, index) in articles"
           		:key="index"
           		note="描述信息"
           	></uni-list-item>
           </uni-list>
        </view>
	</view>
</template>

<script>
	import uniList from '@dcloudio/uni-ui/lib/uni-list/uni-list.vue';
	import uniListItem from '@dcloudio/uni-ui/lib/uni-list-item/uni-list-item.vue';
	export default {
		components: {uniList, uniListItem },
		data() {
			return {
				title: 'Hello',
				articles: [
					{
						id: 1,
						title: '第一篇文章'
					},
					{
						id: 2,
						title: '第二篇文章'
					},
					{
						id: 3,
						title: '第三篇文章'
					},
					{
						id: 4,
						title: '第四篇文章'
					},
					{
						id: 5,
						title: '第五篇文章'
					},
					{
						id: 6,
						title: '第六篇文章'
					}
				]
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>

</style>