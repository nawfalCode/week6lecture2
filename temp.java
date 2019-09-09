class User{
    private String name;
    private int age;
    private String address;

    public void setName(String newName){
        name="Hi ...."+ newName;
    }
    public void setAge(int newAge){
        if(newAge>=17 && newAge<=80)
        age=newAge;
        else System.out.println("Invalid Data");
    }

}

User user=new User();
user.setName