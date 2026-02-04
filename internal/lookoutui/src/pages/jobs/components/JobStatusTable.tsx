import { memo } from "react"

import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import ClearIcon from "@mui/icons-material/Clear"

import { useFormatNumberWithUserSettings } from "../../../components/hooks/formatNumberWithUserSettings"
import { Job } from "../../../models/lookoutModels"

interface JobStatusTableProps {
  jobsToRender: Job[]
  totalJobCount: number
  additionalColumnsToDisplay: {
    displayName: string
    formatter: (job: Job) => string
  }[]
  showStatus: boolean
  jobStatus: Record<string, string>
  onClearJobId?: () => void
  onClearQueue?: () => void
  onClearJobSet?: () => void
  onClearAdditionalColumn?: (columnName: string) => void
  onClearStatus?: () => void
}
export const JobStatusTable = memo(
  ({
    jobsToRender,
    totalJobCount,
    additionalColumnsToDisplay,
    showStatus,
    jobStatus,
    onClearJobId,
    onClearQueue,
    onClearJobSet,
    onClearAdditionalColumn,
    onClearStatus,
  }: JobStatusTableProps) => {
    const formatNumber = useFormatNumberWithUserSettings()

    return (
      <TableContainer>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>
                Job ID
                {onClearJobId && (
                  <IconButton size="small" onClick={onClearJobId} aria-label="clear job id filter">
                    <ClearIcon fontSize="small" />
                  </IconButton>
                )}
              </TableCell>
              <TableCell>
                Queue
                {onClearQueue && (
                  <IconButton size="small" onClick={onClearQueue} aria-label="clear queue filter">
                    <ClearIcon fontSize="small" />
                  </IconButton>
                )}
              </TableCell>
              <TableCell>
                Job Set
                {onClearJobSet && (
                  <IconButton size="small" onClick={onClearJobSet} aria-label="clear job set filter">
                    <ClearIcon fontSize="small" />
                  </IconButton>
                )}
              </TableCell>
              {additionalColumnsToDisplay.map(({ displayName }) => (
                <TableCell key={displayName}>
                  {displayName}
                  {onClearAdditionalColumn && (
                    <IconButton
                      size="small"
                      onClick={() => onClearAdditionalColumn(displayName)}
                      aria-label={`clear ${displayName} filter`}
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  )}
                </TableCell>
              ))}
              {showStatus && (
                <TableCell>
                  Status
                  {onClearStatus && (
                    <IconButton size="small" onClick={onClearStatus} aria-label="clear status filter">
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  )}
                </TableCell>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {jobsToRender.map((job) => (
              <TableRow key={job.jobId}>
                <TableCell>{job.jobId}</TableCell>
                <TableCell>{job.queue}</TableCell>
                <TableCell>{job.jobSet}</TableCell>
                {additionalColumnsToDisplay.map((col) => (
                  <TableCell key={col.displayName}>{col.formatter(job)}</TableCell>
                ))}
                {showStatus && <TableCell>{jobStatus[job.jobId] ?? ""}</TableCell>}
              </TableRow>
            ))}
            {totalJobCount > jobsToRender.length && (
              <TableRow>
                <TableCell colSpan={5}>And {formatNumber(totalJobCount - jobsToRender.length)} more jobs...</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    )
  },
)
