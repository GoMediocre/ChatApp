package queue;

import model.Room;

public class Node {
    private Room room;
    private Node next;

    public Node(Room room) {
        this.room = room;
        this.next = null;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public Node getNext() {
        return next;
    }

    public void setNext(Node next) {
        this.next = next;
    }
}
