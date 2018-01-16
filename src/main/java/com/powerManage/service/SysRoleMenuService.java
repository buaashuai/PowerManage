package com.powerManage.service;

import java.util.List;



/**
 * 角色与菜单对应关系
 * 
 * @author wangshuai
 * @email shuaiwang126@163.com
 * @date 2017年9月18日 上午9:42:30
 */
public interface SysRoleMenuService {
	
	void saveOrUpdate(Long roleId, List<Long> menuIdList);
	
	/**
	 * 根据角色ID，获取菜单ID列表
	 */
	List<Long> queryMenuIdList(Long roleId);
	
}
