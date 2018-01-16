package com.powerManage.utils;

/**
 * 常量
 *
 * @author wangshuai
 * @email shuaiwang126@163.com
 * @date 2017年11月15日 下午1:23:52
 */
public class Constant {

    /**
     * 是否是开发者调试模式
     */
    public static final boolean DEBUG =true;

    /**
     * 菜单类型
     *
     * @author wangshuai
     * @email shuaiwang126@163.com
     * @date 2017年11月15日 下午1:24:29
     */
    public enum MenuType {
        /**
         * 目录
         */
        CATALOG(0),
        /**
         * 菜单
         */
        MENU(1),
        /**
         * 按钮
         */
        BUTTON(2);

        private int value;

        private MenuType(int value) {
            this.value = value;
        }

        public int getValue() {
            return value;
        }
    }

    /**
     * 定时任务状态
     *
     * @author wangshuai
     * @email shuaiwang126@163.com
     * @date 2017年12月3日 上午12:07:22
     */
    public enum ScheduleStatus {
        /**
         * 正常
         */
        NORMAL(0),
        /**
         * 暂停
         */
        PAUSE(1);

        private int value;

        private ScheduleStatus(int value) {
            this.value = value;
        }

        public int getValue() {
            return value;
        }
    }
}
