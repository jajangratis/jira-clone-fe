import SvgIcon from '@mui/material/SvgIcon';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import ListIcon from '@mui/icons-material/List';
import EventNoteIcon from '@mui/icons-material/EventNote';
import BoltIcon from '@mui/icons-material/Bolt';
import DeleteIcon from '@mui/icons-material/Delete';

export function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

export function PlaylistAddCheckIconWrap(props) {
  return (
    <PlaylistAddCheckIcon {...props} />
  )
}

export function ListIconWrap(props) {
  return (
    <ListIcon {...props} />
  )
}

export function EventNoteIconWrap(props) {
  return (
    <EventNoteIcon {...props} />
  )
}

export function BoltIconWrap(props) {
  return (
    <BoltIcon {...props} />
  )
}
export function DeleteIconWrap(props) {
  return (
    <DeleteIcon {...props} />
  )
}

