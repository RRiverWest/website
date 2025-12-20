type TocItem = {
  id: string
  text: string
  level: number
}

export function Toc({ items }: { items: TocItem[] }) {
  return (
    <nav className="text-sm text-muted-foreground">
      <p className="mb-2 font-medium text-foreground">目次</p>
      <ul className="space-y-2">
        {items.map(item => (
          <li
            key={item.id}
            className={item.level === 3 ? "ml-4" : ""}
          >
            <a
              href={`#${item.id}`}
              className="hover:text-foreground transition"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
