package com.powerManage.dao;

import com.powerManage.entity.ScheduleJobEntity;

import java.util.Map;

/**
 * 定时任务
 * 
 * @author wangshuai
 * @email shuaiwang126@163.com
 * @date 2017年12月1日 下午10:29:57
 */
public interface ScheduleJobDao extends BaseDao<ScheduleJobEntity> {
	
	/**
	 * 批量更新状态
	 */
	int updateBatch(Map<String, Object> map);
}
