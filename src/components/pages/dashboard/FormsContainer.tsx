import Badge from "@components/badges/Badge"
import { SxProps, Theme, Box, Typography } from "@mui/material"

type FormsContainerProps = {
  children?: React.ReactNode,
  title: string,
  count: number,
}

export default function FormsContainer({ children, title, count }: FormsContainerProps) {
  return (
    <Box component="section" sx={styles.container}>
      <Box sx={styles.formHeader}>
        <Typography sx={{ fontSize: "1.5rem", fontFamily: "OutfitBold", mr: 2 }}>
          {title}
        </Typography>

        <Badge text={count.toString()} />
      </Box>

      <Box component="div" sx={styles.body}>
        {children}
      </Box>
    </Box>
  )
}

const styles: Record<string, SxProps<Theme>> = {
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "1rem",
    height: "100%",
    overflowY: "auto",
  },

  formHeader: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  body: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    mt: 2,
    gap: 2
  }
}