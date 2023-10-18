/*
 Navicat Premium Data Transfer

 Source Server         : WSL2
 Source Server Type    : MySQL
 Source Server Version : 50740 (5.7.40-0ubuntu0.18.04.1)
 Source Host           : localhost:3306
 Source Schema         : muyun_db

 Target Server Type    : MySQL
 Target Server Version : 50740 (5.7.40-0ubuntu0.18.04.1)
 File Encoding         : 65001

 Date: 18/10/2023 22:00:49
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for auth_role
-- ----------------------------
DROP TABLE IF EXISTS `auth_role`;
CREATE TABLE `auth_role`  (
  `id` int(100) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `role_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '权限名称',
  `menu_names` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '权限菜单',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '权限表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of auth_role
-- ----------------------------
INSERT INTO `auth_role` VALUES (1, '超级管理员', NULL);
INSERT INTO `auth_role` VALUES (2, '普通管理员', '[\"home\"]');

-- ----------------------------
-- Table structure for auth_user
-- ----------------------------
DROP TABLE IF EXISTS `auth_user`;
CREATE TABLE `auth_user`  (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `account` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `password` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `role_id` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '0' COMMENT '角色id',
  `create_time` datetime NULL DEFAULT NULL,
  `update_time` datetime NULL DEFAULT NULL,
  `status` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '0',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `only_account`(`account`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of auth_user
-- ----------------------------
INSERT INTO `auth_user` VALUES (1, 'admin', '$2a$10$oisGD.MbWeCqDVHMRA/DGen/bK37DvXK9c.4S4x/skZfJCY/3HOqm', '管理员000', '1', '2023-04-18 21:35:27', '2023-10-18 21:31:29', '0', '943096489@qq.com');
INSERT INTO `auth_user` VALUES (2, 'admin2', '$2a$10$YbT3M2iSV5BEYVzoKtyJxe9vDEIw3QpEIKz5APKO82eaM/niSrXNO', '管理员', '2', '2023-04-18 21:40:12', '2023-04-19 22:19:13', '0', NULL);
INSERT INTO `auth_user` VALUES (4, 'admin3', '$2a$10$ggTZV4dj/qxoGu3pJTUpCutbx1DRapkIVTj7jRRh6HcbGe4oGI862', '管理员', '2', '2023-04-18 21:48:07', '2023-04-18 21:48:07', '0', NULL);
INSERT INTO `auth_user` VALUES (5, 'admin4', '$2a$10$rH06IOwRko097NfjagAzGuey9/xbbxw6nAVE24G4g3PEFtVJGaGiC', '管理员', '2', '2023-04-18 21:48:20', '2023-10-18 20:37:54', '1', NULL);
INSERT INTO `auth_user` VALUES (6, 'admin5', '$2a$10$U5SSh9ifcmv5MZtv6zTODejEj1rMkwOKZjC6vK48igs04tBSqLS4S', '管理员', '2', '2023-04-18 21:48:49', '2023-04-18 21:48:49', '0', NULL);
INSERT INTO `auth_user` VALUES (7, 'admin6', '$2a$10$dZlS0M.WbfgGdfP7fM.gDe9Eh6951U5Q8wuAQENerDecUhtTcug2O', '管理员', '2', '2023-04-18 21:48:54', '2023-04-18 21:48:54', '0', NULL);
INSERT INTO `auth_user` VALUES (8, 'admin7', '$2a$10$i3Eudhzw0ji4jEfEUlQMAuw38OBiUUgpmCDcF1k5MELsS2MZgcqlm', '管理员', '2', '2023-04-18 21:48:58', '2023-04-18 21:48:58', '0', NULL);
INSERT INTO `auth_user` VALUES (9, 'admin8', '$2a$10$QJinR7/gLVF4KFaOqrNxVOKmH8WzfVTUapdFL6vG1tdXeYAqxrBsG', '管理员', '2', '2023-04-18 21:49:01', '2023-04-18 21:49:01', '0', NULL);
INSERT INTO `auth_user` VALUES (10, 'admin9', '$2a$10$GGcDzQ7qIyizF.xoPem.MOcp1gjj1PfOOfth4AKfFImFTJ2L8zmvO', '管理员', '2', '2023-04-18 21:49:05', '2023-04-18 21:49:05', '0', NULL);
INSERT INTO `auth_user` VALUES (11, 'admin10', '$2a$10$9Gc5DQYNDYjMzmDo5BVbMOvaW2RbChjIe8rrskNRPiLVZ.p7iYvIm', '管理员', '2', '2023-04-18 21:49:11', '2023-04-18 21:49:11', '0', NULL);
INSERT INTO `auth_user` VALUES (12, 'admin11', '$2a$10$4Ihrk0Ae8fl4Z8s/5EDXselhSXXCLEfQO7hokAOdrYkiE.mw.X1LO', '管理员', '2', '2023-04-18 21:49:14', '2023-04-18 21:49:14', '0', NULL);
INSERT INTO `auth_user` VALUES (13, 'admin12', '$2a$10$6c/sdDElH0IEUwnR7WHx2uaY.hIp6suP11aJG9Hk/KFzhre0SG53S', '管理员', '2', '2023-04-18 21:49:17', '2023-04-18 21:49:17', '0', NULL);

SET FOREIGN_KEY_CHECKS = 1;
