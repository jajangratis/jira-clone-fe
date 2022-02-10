
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Grid } from "@mui/material";
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { DragDropContext, Droppable, Draggable  } from 'react-beautiful-dnd';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const todo = [
    {name: 'todo1', id: '1',},
    {name: 'todo2', id: '2',},
]
const ongoing = [
    {name: 'ongoing', id: '3',},
    {name: 'ongoing', id: '4',},
]
const readytotest = [
    {name: 'readytotest'},
    {name: 'readytotest'},
]
const done = [
    {name: 'done'},
    {name: 'done'},
]

const itemStyle = {width: '100vh'}

const ActiveSprintData = () => {
    return (
            <div>
                <DragDropContext>
                    <Grid container>
                        <Grid items xs={3}>
                            <Item>
                                <Typography gutterBottom variant="h6" component="div" className={`centered`} >
                                    TODO
                                </Typography>
                            </Item>
                            <Divider/>
                            <Droppable droppableId="todo">
                            {(provided) => (
                                <List className="characters" {...provided.droppableProps} ref={provided.innerRef} style={{backgroundColor: 'rgb(244, 245, 247)'}}>
                                {todo.map(({id, name}, index) => {
                                    return (
                                    <Draggable key={id} draggableId={id} index={index}>
                                        {(provided) => (
                                        <ListItem ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                            <Item style={itemStyle}>{name}</Item>
                                        </ListItem>
                                        )}
                                    </Draggable>
                                    );
                                })}
                                {provided.placeholder}
                                </List>
                            )}
                            </Droppable>
                        </Grid>
                        <Grid items xs={3}>
                            <Item>
                                <Typography gutterBottom variant="h6" component="div" className={`centered`} >
                                    Ongoing
                                </Typography>
                            </Item>
                            <Droppable droppableId="ongoing">
                            {(provided) => (
                                <List className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                                {ongoing.map(({id, name}, index) => {
                                    return (
                                    <Draggable key={id} draggableId={id} index={index}>
                                        {(provided) => (
                                        <ListItem ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                            <Item style={itemStyle}>{name}</Item>
                                        </ListItem>
                                        )}
                                    </Draggable>
                                    );
                                })}
                                {provided.placeholder}
                                </List>
                            )}
                            </Droppable>
                        </Grid>
                        
                    </Grid>
                
                </DragDropContext>
            </div>
    )
}

export default ActiveSprintData



{/* <Grid items xs={3}>
<Typography gutterBottom variant="h6" component="div" className={`centered`}>
    TODO
</Typography>
<DragDropContext>
    <Droppable droppableId="characters">
    {(provided) => (
        <List className="characters" {...provided.droppableProps} ref={provided.innerRef}>
        {todo.map(({id, name}, index) => {
            return (
            <Draggable key={id} draggableId={id} index={index}>
                {(provided) => (
                <ListItem ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <p>
                    { name }
                    </p>
                </ListItem>
                )}
            </Draggable>
            );
        })}
        {provided.placeholder}
        </List>
    )}
    </Droppable>
</DragDropContext>
<Divider/>
</Grid> */}


