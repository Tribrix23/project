export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const type = searchParams.get("type") // provinces | cities | barangays
  const code = searchParams.get("code") // parent code

  let url = ""

  try {
    if (type === "provinces") {
      url = "https://psgc.gitlab.io/api/provinces/"
    }

    if (type === "cities" && code) {
      url = `https://psgc.gitlab.io/api/provinces/${code}/cities-municipalities/`
    }

    if (type === "barangays" && code) {
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