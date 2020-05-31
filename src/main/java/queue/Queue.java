package queue;

import model.Room;

import javax.websocket.Session;

public class Queue {
    private Node headNode;
    private Node tailNode;

    public void enQueue(Room room) {
        Node node = new Node(room);
        if (headNode == null) {
            headNode = node;
        } else {
            tailNode.setNext(node);
        }
        tailNode = node;
    }

    public Node deQueue() {
        Node node = headNode;
        if (headNode != null)
            headNode = headNode.getNext();
        if (headNode == null)
            tailNode = null;
        return node;
    }

    public boolean isEmpty() {
        return headNode == null;
    }
}
