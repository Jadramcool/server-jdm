/*
 * @Author: jdm
 * @Date: 2024-08-21 15:59:38
 * @LastEditors: jdm
 * @LastEditTime: 2024-08-21 16:23:49
 * @FilePath: \APP\src\utils\filterHelper.ts
 * @Description: 添加过滤条件
 *
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
      if (filters[`${f}_in`]) {
        sqlFilters[f] = { contains: filters[`${f}_in`] };
      }
      if (filters[`${f}_not_in`]) {
        sqlFilters[f] = {
          ...sqlFilters[f],
          not: { contains: filters[`${f}_not_in`] },
        };
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
