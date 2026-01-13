import DOMPurify from "dompurify";

export default {
  tags: ["autodocs"],
  render: ({ content, className }) => {
    const el = document.createElement("div");
    const sanitized = DOMPurify.sanitize(content);
    el.innerHTML = sanitized;
    el.className = ["card", ...(className || [])];
    return el;
  },
};

export const Default = {
  args: {
    content:
      "<p>窓から差し込む柔らかな日差しが、木のテーブルを優しく照らしています。挽きたての豆の香りが店内に広がり、静かな音楽とともに穏やかな時間が流れていきます。お気に入りの本を片手に、こだわりの一杯を楽しみながら、日常の喧騒を忘れて心安らぐひとときをお過ごしください。</p>",
  },
};
