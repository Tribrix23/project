export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const type = searchParams.get("type") // provinces | cities | barangays
  const code = searchParams.get("code") // parent code
  const isValidCode = typeof code === "string" && /^\d+$/.test(code)

  let url = ""

  try {
    if (type === "provinces") {
      url = "https://psgc.gitlab.io/api/provinces/"
    }

    if (type === "cities" && isValidCode) {
      url = `https://psgc.gitlab.io/api/provinces/${code}/cities-municipalities/`
    }

    if (type === "barangays" && isValidCode) {
      url = `https://psgc.gitlab.io/api/cities-municipalities/${code}/barangays/`
    }

    if (!url) {
      return Response.json({ error: "Invalid parameters" }, { status: 400 })
    }

    const res = await fetch(url, {
      cache: "no-store",
    })

    const data = await res.json()

    return Response.json(data)
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch PSGC data" },
      { status: 500 }
    )
  }
}