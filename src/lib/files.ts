/** Quote CSV correctly and neutralize spreadsheet formula injection in text fields. */
export function csvCell(value: unknown): string {
  const s = String(value ?? '');
  const safe = /^[=+@\t\r]/.test(s) || (/^-/.test(s) && !/^-?\d+(\.\d+)?$/.test(s)) ? `'${s}` : s;
  return `"${safe.replace(/"/g, '""')}"`;
}
export function downloadFile(name: string, content: string, mime = 'text/plain;charset=utf-8') {
  const url = URL.createObjectURL(new Blob([content], { type: mime }));
  const a = document.createElement('a'); a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export function downloadCsv(name: string, headers: string[], rows: unknown[][]) { downloadFile(name, '\ufeff' + [headers, ...rows].map(row => row.map(csvCell).join(',')).join('\r\n'), 'text/csv;charset=utf-8'); }
/** RFC4180-style parser: supports quoted commas, escaped quotes and newlines. */
export function parseCsv(text: string): { headers: string[]; rows: string[][] } {
  if (text.length > 1024 * 1024) throw new Error('演示导入上限为1MB');
  const input = text.replace(/^\uFEFF/, ''); const rows: string[][] = []; let row: string[] = [], cell = '', quoted = false;
  for (let i = 0; i < input.length; i++) {
    const c = input[i];
    if (c === '"') { if (quoted && input[i + 1] === '"') { cell += '"'; i++; } else if (quoted || cell === '') quoted = !quoted; else throw new Error('CSV引号格式无效'); }
    else if (!quoted && c === ',') { row.push(cell.trim()); cell = ''; }
    else if (!quoted && (c === '\n' || c === '\r')) { if (c === '\r' && input[i + 1] === '\n') i++; row.push(cell.trim()); if (row.some(x => x !== '')) rows.push(row); row = []; cell = ''; }
    else cell += c;
  }
  if (quoted) throw new Error('CSV存在未闭合的引号');
  row.push(cell.trim()); if (row.some(x => x !== '')) rows.push(row);
  if (rows.length < 2) throw new Error('CSV必须包含表头和至少一行数据');
  const headers = rows.shift()!;
  if (headers.some(x => !x) || new Set(headers).size !== headers.length) throw new Error('表头不能为空或重复');
  const bad = rows.findIndex(r => r.length !== headers.length); if (bad !== -1) throw new Error(`第${bad + 2}行列数与表头不一致`);
  if (rows.length > 2000) throw new Error('演示导入最多2000行');
  return { headers, rows };
}
