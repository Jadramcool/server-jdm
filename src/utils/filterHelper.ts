/*
 * @Author: jdm
 * @Date: 2024-08-21 15:59:38
 * @LastEditors: jdm
 * @LastEditTime: 2024-10-31 11:06:33
 * @FilePath: \APP\src\utils\filterHelper.ts
 * @Description: 添加过滤条件
 *
 */

/**
 * @description: 通过传来的key，解析出对应的过滤条件
 * @param {Record<string, any>} filters 过滤条件
 * @param {string | string[]} field 字段名
 * @return {*}
 */
export const addFilterCondition = (
  filters: Record<string, any>,
  field: string | string[]
) => {
  const sqlFilters: Record<string, any> = {};

  const processField = (f: string) => {
    if (filters[f]) {
      // 如果有具体的值，直接使用 equals 条件，忽略其他条件
      sqlFilters[f] = { equals: filters[f] };
    } else {
      // 如果没有具体的值，再检查 in 和 not_in
      if (filters[`${f}__in`]) {
        if (Array.isArray(filters[`${f}__in`])) {
          sqlFilters[f] = { in: filters[`${f}__in`] };
        } else {
          sqlFilters[f] = { contains: filters[`${f}__in`] };
        }
      }
      if (filters[`${f}__not_in`]) {
        if (Array.isArray(filters[`${f}__not_in`])) {
          sqlFilters[f] = { notIn: filters[`${f}__not_in`] };
        } else {
          sqlFilters[f] = {
            ...sqlFilters[f],
            not: { contains: filters[`${f}__not_in`] },
          };
        }
      }
    }
  };

  if (Array.isArray(field)) {
    field.forEach(processField);
  } else {
    processField(field);
  }

  return sqlFilters;
};