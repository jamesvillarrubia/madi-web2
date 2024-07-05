/** AUTO-SUMMARY **
   Purpose: This file defines a React component `VersionBox` that fetches and displays the latest version tag of a GitHub repository.

   Key Components:
   - `getLastVersionTag`: An asynchronous function that fetches the latest version tag from a GitHub repository.
   - `VersionBox`: A React functional component that displays the latest version tag.
   - `Commit` and `Tag`: TypeScript type definitions for handling commit and tag data structures.

   Functional Overview: 
   - `getLastVersionTag` fetches all tags and commits from a specified GitHub repository and branch, filters for tagged commits, and returns the most recent tag based on the commit date.
   - `VersionBox` uses the `getLastVersionTag` function to fetch the latest version tag when the component mounts and displays this version in the UI.

   Dependencies and Integrations:
   - Uses React's `useState` and `useEffect` for state management and side effects.
   - Fetches data from an external GitHub API and a local JSON file (`/sha.json`).
   - Integrates with `@radix-ui/themes` for styled components.

   Additional Context:
   - The component handles errors gracefully by logging them and continues to display a default version if no tag is found or an error occurs.
   - The file includes error handling for both network requests and logical errors, such as missing tags or commits.
*** END-SUMMARY **/
import { useEffect, useState } from 'react'
import { Box } from '@radix-ui/themes'

type Commit = { sha: string; commit: { committer: { date: string } } }

type Tag = { tag: string; commit: Commit }


async function getLastVersionTag(owner: string, repo: string, branch: string) {
  if (!(owner && repo && branch)) {
    return null
  }
  try {
    const tagsResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/tags`)
    const tags = await tagsResponse.json()
    const tagSHAs = Array.isArray(tags) ? tags.map((tag: Tag) => tag.commit.sha) : []
    const commitsResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/commits?sha=${branch}`
    )
    const commits: Commit[] = await commitsResponse.json()
    const taggedCommits = Array.isArray(tags)
      ? commits.filter((commit: Commit) => tagSHAs.includes(commit.sha))
      : []

    for (let i = taggedCommits.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[taggedCommits[i], taggedCommits[j]] = [taggedCommits[j], taggedCommits[i]]
    }

    const sortedCommits = taggedCommits.sort((a: Commit, b: Commit) => {
      const dateA = new Date(a.commit.committer.date)
      const dateB = new Date(b.commit.committer.date)
      return dateB.getTime() - dateA.getTime()
    })

    const lastTaggedCommit = sortedCommits[0]

    if (lastTaggedCommit) {
      const lastTag = tags.find((tag: Tag) => tag.commit.sha === lastTaggedCommit.sha)
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
  } catch (error: unknown) {
    if(error instanceof Error) {
      console.error('Error:', error.message)
      return null
    }
  }
}

const VersionBox = () => {
  const [version, setVersion] = useState('v0.0.0')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/sha.json')
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
