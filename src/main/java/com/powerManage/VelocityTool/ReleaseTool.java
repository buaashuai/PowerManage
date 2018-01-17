package com.powerManage.VelocityTool;

import com.powerManage.utils.Constant;

import java.util.HashMap;
import java.util.Map;

/**
 * 部署工具
 *
 * @author WangShuai
 * @date 2018/1/17 22:36
 */
public class ReleaseTool {
    /**
     * 获取资源路径
     *
     * @return
     */
    public String getReourcePath(String resId) {
        Map<String, String> respurceMap = new HashMap<>();
        respurceMap.put("common", "js/common");
        if (Constant.DEBUG) {
            if (resId.isEmpty()) {
                return "js/sys";
            } else {
                return respurceMap.get(resId);
            }
        } else {
            return "dest";
        }
    }

}
