package common;

//import java.util.ArrayList;

public class Demo extends Test{
    public static void main(String[] args) {
//        ArrayList<String> list = new ArrayList<>();
        java.util.ArrayList<String> list = new java.util.ArrayList<>();
        new Demo().show(list);
        Momo test = new Test();
        System.out.println(test.a);
        test.setAge();
    }

    private  void show(java.util.ArrayList<String> list) {
        System.out.println("I am fully Qualified Name");
        super.show();
    }
}

class Test extends Momo{
    int a = 50;
    public void show() {
        System.out.println("I am Test Show");
    }
    public void setAge() {
        System.out.println("I am Test :");
    }
}
class Momo {
    int a = 20;
    int b;
    public void setAge() {
        System.out.println("I am momo");
    }
    public void show() {
        System.out.println("I am show");
    }
}
