import { useEffect, useState } from 'react'
import { Box } from '@radix-ui/themes'

async function getLastVersionTag(owner: string, repo: string, branch: string) {
  try {
    const tagsResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/tags`)
    const tags = await tagsResponse.json()
    const tagSHAs = tags.map((tag: any) => tag.commit.sha)
    const commitsResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/commits?sha=${branch}`
    )
    const commits = await commitsResponse.json()
    const taggedCommits = commits.filter((commit: any) => tagSHAs.includes(commit.sha))

    for (let i = taggedCommits.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[taggedCommits[i], taggedCommits[j]] = [taggedCommits[j], taggedCommits[i]]
    }

    const sortedCommits = taggedCommits.sort((a: any, b: any) => {
      const dateA = new Date(a.commit.committer.date)
      const dateB = new Date(b.commit.committer.date)
      return dateB.getTime() - dateA.getTime()
    })

    const lastTaggedCommit = sortedCommits[0]

    if (lastTaggedCommit) {
      const lastTag = tags.find((tag: any) => tag.commit.sha === lastTaggedCommit.sha)
      if (lastTag) {
        return {
          tag: lastTag.name,
          commit: lastTaggedCommit
        }
      } else {
        throw new Error('No matching tag found for the last tagged commit.')
      }
    } else {
      throw new Error('No tagged commits found in the specified branch history.')
    }
  } catch (error: any) {
    console.error('Error:', error.message)
    return null
  }
}

const VersionBox = () => {
  const [version, setVersion] = useState('v0.0.0')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/public/sha.json')
        const data = await response.json()
        const { owner, repo, branch } = data

        const result = await getLastVersionTag(owner, repo, branch)
        if (result) {
          setVersion(result.tag)
        } else {
          console.log('No version tag found.')
        }
      } catch (error) {
        console.error('Error fetching sha.json:', error)
      }
    }

    fetchData()
  }, [])

  return <Box className="text-xs text-right text-gray-500">{version}</Box>
}

export { VersionBox }
