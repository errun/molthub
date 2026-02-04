"use client";

import { useEffect, useRef, useState } from "react";

type OpenClawSkillTableProps = {
  headers: string[];
  rows: string[][];
  installColumnIndex: number;
  copyLabel: string;
  copiedLabel: string;
};

const normalizeRow = (row: string[], length: number) => {
  if (row.length === length) {
    return row;
  }
  if (row.length > length) {
    return row.slice(0, length);
  }
  return [...row, ...Array.from({ length: length - row.length }, () => "")];
};

const stripBackticks = (value: string) => value.replace(/^`+|`+$/g, "").trim();

export default function OpenClawSkillTable({
  headers,
  rows,
  installColumnIndex,
  copyLabel,
  copiedLabel
}: OpenClawSkillTableProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopy = async (value: string, key: string) => {
    if (!value) {
      return;
    }

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = value;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopiedKey(key);
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(() => {
        setCopiedKey(null);
      }, 1600);
    } catch {
      setCopiedKey(null);
    }
  };

  if (!headers.length) {
    return null;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-white/10 rounded-lg">
        <thead className="bg-white/5">
          <tr className="border-b border-white/10">
            {headers.map((header, index) => (
              <th
                key={`header-${index}`}
                className="px-4 py-3 text-left font-semibold text-ink text-sm"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => {
            const normalizedRow = normalizeRow(row, headers.length);
            return (
              <tr key={`row-${rowIndex}`} className="border-b border-white/10">
                {normalizedRow.map((cell, cellIndex) => {
                  if (cellIndex !== installColumnIndex) {
                    return (
                      <td
                        key={`cell-${rowIndex}-${cellIndex}`}
                        className="px-4 py-3 text-sm text-muted"
                      >
                        {cell || "-"}
                      </td>
                    );
                  }

                  const command = stripBackticks(cell);
                  const key = `${rowIndex}-${cellIndex}`;
                  const isCopied = copiedKey === key;

                  return (
                    <td
                      key={`cell-${rowIndex}-${cellIndex}`}
                      className="px-4 py-3 text-sm text-muted"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        {command ? (
                          <code className="bg-white/10 text-accent px-2 py-1 rounded text-xs font-mono">
                            {command}
                          </code>
                        ) : (
                          <span>-</span>
                        )}
                        <button
                          type="button"
                          className={`btn-ghost px-3 py-1 text-xs ${
                            command ? "" : "opacity-50 cursor-not-allowed"
                          }`}
                          onClick={() => handleCopy(command, key)}
                          disabled={!command}
                          aria-label={command ? `${copyLabel}: ${command}` : copyLabel}
                        >
                          {isCopied ? copiedLabel : copyLabel}
                        </button>
                      </div>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
